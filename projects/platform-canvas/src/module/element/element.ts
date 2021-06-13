import Displayable, { DisplayableProps } from 'zrender/src/graphic/Displayable';
import { isRect, isText } from './is';
import type * as Zrender from 'zrender';
import { Rect } from 'zrender';
import { coerceNumber } from './corere';
declare let zrender: typeof Zrender;
export class ZrenderElement {
  contaienr: Zrender.Group = new zrender.Group();
  childrenContainer: Zrender.Group = new zrender.Group();
  parent?: ZrenderElement;
  private children: ZrenderElement[] = [];
  style: Record<string, string> = {};
  next?: ZrenderElement;
  pre?: ZrenderElement;
  constructor(public instance: Displayable) {
    this.contaienr.add(this.instance);
    this.contaienr.add(this.childrenContainer);
  }

  appendChild(child: ZrenderElement) {
    child.parent = this;
    let preChild = this.children.length
      ? this.children[this.children.length - 1]
      : undefined;
    if (preChild) {
      preChild.next = child;
    }
    child.pre = preChild;
    this.childrenContainer.add(child.contaienr);
    this.children.push(child);
  }

  reFlow() {
    this.format();
  }
  rePaint() {
    if (this.style['background']) {
      if (isRect(this.instance)) {
        this.instance.attr('style', {
          ...this.instance.style,
          fill: this.style['background'],
        });
      }
    }
  }
  insertBefore(
    newChild: ZrenderElement,
    refChild: ZrenderElement,
    isMove?: boolean
  ) {
    newChild.parent = this;
    let index = this.children.findIndex((item) => item === refChild);
    let preChild = index - 1 > -1 ? this.children[index - 1] : undefined;
    if (preChild) {
      preChild.next = newChild;
    }
    newChild.pre = preChild;
    newChild.next = refChild;
    refChild.pre = newChild;
    this.childrenContainer.addBefore(newChild.contaienr, refChild.contaienr);
    this.children.splice(index, 0, newChild);
  }
  removeChild(oldChild: ZrenderElement, isHostElement?: boolean) {
    oldChild.parent = undefined;
    let index = this.children.findIndex((item) => item === oldChild);
    let preChild = oldChild.pre;
    let nextChild = oldChild.next;
    if (preChild) {
      preChild.next = nextChild;
    }
    if (nextChild) {
      nextChild.pre = preChild;
    }
    oldChild.pre = undefined;
    oldChild.next = undefined;
    this.children.splice(index, 1);
    this.childrenContainer.remove(oldChild.contaienr);
  }
  /** 设置样式,在添加到节点中时使用 */
  setStyle(name: string, value: string, namespace?: string | null) {
    if (name != 'style') {
      return;
    }
    let style = value
      .split(';')
      .filter((item) => item)
      .map((item) => item.split(':'))
      .reduce((pre, cur) => {
        pre[cur[0].trim()] = cur[1].trim();
        return pre;
      }, {});
    this.style = { ...this.style, ...style };
  }

  /**
   * 需要在添加子元素时定义宽度
   * todo 重构分为不同元素继承基类实现抽象方法
   */
  format(): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    this.rePaint();
    let display = this.style['display'];

    let pre: ZrenderElement = this.pre;
    while (pre && pre.instance.ignore) {
      pre = pre.pre;
    }
    let next: ZrenderElement = this.next;
    while (next && next.instance.ignore) {
      next = next.next;
    }

    let parentInstance: Rect | undefined = this.parent
      ? this.parent.instance
      : (undefined as any);
    if (display === 'block') {
      if (isRect(this.instance)) {
        let width = coerceNumber(this.style['width']);
        let height = coerceNumber(this.style['height']);
        width =
          typeof width === 'number'
            ? width
            : parentInstance
            ? parentInstance.shape.width
            : this.instance.shape.width;
        this.instance.attr('shape', {
          ...this.instance.shape,
          width: width,
        });
        if (typeof height === 'number') {
          height = height;
          this.instance.attr('shape', {
            ...this.instance.shape,
            height: height,
          });
          this.children.forEach((child) => {
            child.format();
          });
        } else {
          height = this.children.reduce((currentHeigh, child) => {
            if (child.instance.ignore) {
              return currentHeigh;
            }
            return Math.max(currentHeigh, child.format().height);
          }, 0);
        }
        this.instance.attr('shape', {
          ...this.instance.shape,
          width: width,
          height: height,
        });

        return {
          x: this.contaienr.x,
          y: this.contaienr.y,
          width: width,
          height: height,
        };
      }
    } else {
      if (isText(this.instance)) {
        // todo未处理多个文本下生成匿名块时的问题,可能会溢出
        // 单一匿名块
        if (
          (pre && pre.style.display === 'block' && !next) ||
          (next && next.style.display === 'block' && !pre) ||
          (!pre && !next)
        ) {
          this.instance.attr('style', {
            ...this.instance.style,
            width: parentInstance.shape.width,
            overflow: 'break',
          });
          this.contaienr.attr('x', 0);
          let y = 0;
          if (pre) {
            y = pre.contaienr.y + pre.contaienr.getBoundingRect().height;
          }
          this.contaienr.attr('y', y);

          return {
            x: 0,
            y,
            width: parentInstance.shape.width,
            height: this.contaienr.getBoundingRect().height,
          };
        } else {
          let x = 0;
          let y = 0;
          if (pre) {
            if (pre.style['display'] === 'block') {
              x = 0;
              y = pre.contaienr.y + pre.contaienr.getBoundingRect().height;
            } else {
              y = pre.contaienr.y;
              x = pre.contaienr.x + pre.contaienr.getBoundingRect().width;
            }
          }

          if (x >= parentInstance.shape.width) {
            x = 0;
            y += pre.contaienr.getBoundingRect().height;
          }
          this.contaienr.attr('x', x);
          this.contaienr.attr('y', y);
          this.instance.attr('style', {
            ...this.instance.style,
            width: undefined,
          });
          let rect = this.contaienr.getBoundingRect();

          return {
            x,
            y,
            width: rect.width,
            height: rect.height,
          };
        }
      }
    }
  }
}
