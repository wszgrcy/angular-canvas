import Displayable from 'zrender/src/graphic/Displayable';
import { isRect } from './is';
export class ZrenderElement {
  parent?: ZrenderElement;
  children: ZrenderElement[] = [];
  constructor(public instance: Displayable) {}
  update() {
    if (!this.parent) {
      return;
    }

    let parentInstance = this.parent.instance;
    let parentRect = parentInstance.getBoundingRect();
    let childRect = this.instance.getBoundingRect();
    this.instance.attr('x', parentRect.x);
    this.instance.attr('y', parentRect.height);
    if (isRect(parentInstance)) {
      parentInstance.attr('shape', {
        x: parentRect.x,
        y: parentRect.y,
        width: Math.max(childRect.width, parentRect.width),
        height: Math.max(childRect.height, parentRect.height),
      });
      this.parent.update();
    }
  }
}
