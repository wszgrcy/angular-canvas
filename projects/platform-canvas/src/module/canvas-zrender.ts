import { Injectable } from '@angular/core';

import 'zrender/index.js';
import { Rect, ZRenderType } from 'zrender/index.js';
import Displayable from 'zrender/src/graphic/Displayable';
import { ZrenderElement } from './element/element';
import type * as a from 'zrender';
declare let zrender: typeof a;

@Injectable()
export class CanvasZrenderService {
  instanceMap: Map<HTMLElement, ZRenderType> = new Map();
  shouldReflow = false;
  private instance!: ZRenderType;
  init(dom: HTMLElement) {
    this.instance = zrender.init(dom);
    this.instanceMap.set(dom, this.instance);
  }
  create(name: string, options?): ZrenderElement {
    let instance = this.createMap.get(name)(options);
    let zel = new ZrenderElement(instance);
    if (name === 'div') {
      zel.style.display = 'block';
    } else if (name === 'text') {
      zel.style.display = 'inline';
    }
    return zel;
  }
  private createDiv(): Displayable {
    let div = new zrender.Rect({ style: { fill: 'none' } });
    return div;
  }
  private createText(value: string): Displayable {
    let text = new zrender.Text({ style: { text: value } });
    return text;
  }
  private createComment(value: string): Displayable {
    let text = new zrender.Text({ style: { text: value } });
    text.hide();
    return text;
  }

  root: ZrenderElement;
  selectRootElement() {
    if (!this.root) {
      this.root = this.create('div');
    }
    let rect = this.root.instance as Rect;
    rect.attr('shape', {
      x: rect.shape.x,
      y: rect.shape.y,
      width: this.instance.getWidth(),
      height: this.instance.getHeight(),
    });
    return this.root;
  }
  private createMap = new Map([
    ['div', () => this.createDiv()],
    ['text', (value) => this.createText(value)],
    ['comment', (value) => this.createComment(value)],
  ]);
  add(element: ZrenderElement) {
    this.instance.add(element.contaienr);
  }
}
