import { Injectable } from '@angular/core';

import 'zrender/index.js';
import type * as a from 'zrender';
import { Rect, ZRenderType } from 'zrender/index.js';
import Displayable from 'zrender/src/graphic/Displayable';
import { ZrenderElement } from './element/element';
declare let zrender: typeof a;

@Injectable()
export class CanvasZrenderService {
  instanceMap: Map<HTMLElement, ZRenderType> = new Map();
  instance!: ZRenderType;
  init(dom: HTMLElement) {
    this.instance = zrender.init(dom, { width: '500px', height: '500px' });
    this.instanceMap.set(dom, this.instance);
  }
  create(name: string, options?): ZrenderElement {
    let instance = this.createMap.get(name)(options);
    return new ZrenderElement(instance);
  }
  private createDiv(): Displayable {
    let div = new zrender.Rect({ style: { fill: 'none' } });
    return div;
  }
  private createText(value: string): Displayable {
    let text = new zrender.Text({ style: { text: value } });
    return text;
  }
  private createComment(value:string):Displayable{
    let text = new zrender.Text({ style: { text: value } });
    text.hide()
    return text;
  }
  private createMap = new Map([
    ['div', () => this.createDiv()],
    ['text', (value) => this.createText(value)],
    ['comment', (value) => this.createComment(value)],
  ]);
  add(displayable: Displayable) {
    this.instance.add(displayable);
  }
}
