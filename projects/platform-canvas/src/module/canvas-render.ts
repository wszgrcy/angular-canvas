import { Renderer2 } from '@angular/core';
import { CanvasZrenderService } from './canvas-zrender';
import { ZrenderElement } from './element/element';
import { isText } from './element/is';
export class CanvasRenderer implements Renderer2 {
  constructor(private canvasZrender: CanvasZrenderService) {}
  data: { [key: string]: any } = Object.create(null);
  destroy() {}
  createElement(name: string, namespace?: string | null) {
    console.log('创建元素?', name, namespace);
    return this.canvasZrender.create(name);
  }
  createComment(value: string) {
    console.log('创建评论?');
    return this.canvasZrender.create('comment', value);
  }
  createText(value: string) {
    console.log('创建文本?', value);
    return this.canvasZrender.create('text', value);
  }
  destroyNode() {
    console.log('删除节点?');
  }
  appendChild(parent: ZrenderElement, newChild: ZrenderElement) {
    console.log('添加子节点', parent, newChild);
    newChild.parent = parent;
    parent.children.push(newChild);
    newChild.update();
    this.canvasZrender.add(newChild.instance);
  }
  insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean) {
    console.log('插入到前面?', parent, newChild, refChild, isMove);
  }
  removeChild() {
    console.log('移除子节点?');
  }
  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean) {
    if (this.canvasZrender.instance) {
      return this.canvasZrender.instance;
    }
    let el = document.querySelector(selectorOrNode);
    this.canvasZrender.init(el);
    let root = this.canvasZrender.create('div');
    return root;
  }
  parentNode(node: ZrenderElement) {
    console.log('父级?', node);
    return node.parent;
  }
  nextSibling() {
    console.log('下一个?');
  }
  setAttribute(
    el: any,
    name: string,
    value: string,
    namespace?: string | null
  ) {
    console.log('设置属性', el, name, value, namespace);
  }
  removeAttribute() {
    console.log('删除属性');
  }
  addClass() {
    console.log('添加类');
  }
  removeClass() {
    console.log('移除类');
  }
  setStyle() {
    console.log('设置样式');
  }
  removeStyle() {
    console.log('移除样式');
  }
  setProperty() {
    console.log('设置属性');
  }
  setValue(node: ZrenderElement, value: string) {
    console.log('设置值', node, value);
    if (isText(node.instance)) {
      node.instance.attr('style', { text: value });
    }
  }
  listen() {
    return () => {};
  }
}
