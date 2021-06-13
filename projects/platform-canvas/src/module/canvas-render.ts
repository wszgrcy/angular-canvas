import { Renderer2, RendererStyleFlags2 } from '@angular/core';
import { CanvasZrenderService } from './canvas-zrender';
import { ZrenderElement } from './element/element';
import { isText } from './element/is';
export class CanvasRenderer implements Renderer2 {
  constructor(private canvasZrender: CanvasZrenderService) {}
  data: { [key: string]: any } = Object.create(null);
  destroy() {}
  createElement(name: string, namespace?: string | null) {
    console.warn('[✓]创建元素?', name, namespace);
    return this.canvasZrender.create(name);
  }
  createComment(value: string) {
    console.warn('[✓]创建评论?');
    return this.canvasZrender.create('comment', value);
  }
  createText(value: string) {
    console.warn('[✓]创建文本?', value);
    return this.canvasZrender.create('text', value);
  }
  /** todo 目前不需要实现 */
  destroyNode(a) {
    // console.warn('[×]删除节点?',a);
  }
  appendChild(parent: ZrenderElement, newChild: ZrenderElement) {
    console.warn('[✓]添加子节点', parent, newChild);

    parent.appendChild(newChild);
    this.canvasZrender.selectRootElement().reFlow();
  }
  insertBefore(
    parent: ZrenderElement,
    newChild: ZrenderElement,
    refChild: ZrenderElement,
    isMove?: boolean
  ) {
    console.warn('[✓]插入到前面?', parent, newChild, refChild, isMove);
    parent.insertBefore(newChild, refChild, isMove);
    this.canvasZrender.selectRootElement().reFlow();
  }
  removeChild(
    parent: ZrenderElement,
    oldChild: ZrenderElement,
    isHostElement?: boolean
  ) {
    console.warn('[✓]移除子节点?', parent, oldChild, isHostElement);
    parent.removeChild(oldChild, isHostElement);
    this.canvasZrender.selectRootElement().reFlow();
  }
  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean) {
    console.warn('[✓]选择子元素');
    let el = document.querySelector(selectorOrNode);
    this.canvasZrender.init(el);
    let zrenderElement = this.canvasZrender.selectRootElement();
    this.canvasZrender.add(zrenderElement);
    return zrenderElement;
  }
  parentNode(node: ZrenderElement) {
    console.warn('[✓]父级?', node);
    return node.parent;
  }
  nextSibling() {
    console.warn('[×]下一个?');
  }
  /**
   * todo 仅实现样式 display部分,background部分,width部分,height部分 部分
   */
  setAttribute(
    el: ZrenderElement,
    name: string,
    value: string,
    namespace?: string | null
  ) {
    console.warn(
      '[×]设置属性',
      el,
      '名字',
      name,
      '值',
      value,
      '空间',
      namespace
    );
    el.setStyle(name, value, namespace);
    this.canvasZrender.selectRootElement().reFlow();

  }
  removeAttribute() {
    console.warn('[×]删除属性');
  }
  addClass() {
    console.warn('[×]添加类');
  }
  removeClass() {
    console.warn('[×]移除类');
  }
  setStyle(el: ZrenderElement, style: string, value: any, flags?: RendererStyleFlags2) {
    console.warn('[×]设置样式',el,style,value,flags);
    el.style={...el.style,[style]:value}
    this.canvasZrender.selectRootElement().reFlow();
  }
  removeStyle() {
    console.warn('[×]移除样式');
  }
  setProperty() {
    console.warn('[×]设置属性');
  }
  setValue(node: ZrenderElement, value: string) {
    console.warn('设置值', node, value);
    if (isText(node.instance)) {
      node.instance.attr('style', { text: value.trim() });
    }
  }
  listen(
    target: ZrenderElement,
    eventName: string,
    callback: (event: any) => boolean | void
  ) {
    console.warn('[×]监听?', target, eventName, callback);
    if (eventName === 'click') {
      target.contaienr.on('click', (e) => {
        callback(e);
      });
      return () => {
        target.contaienr.off('click');
      };
    }
    return () => {};
  }
}
