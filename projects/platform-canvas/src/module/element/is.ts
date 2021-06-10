import { Rect, Text } from 'zrender';
import Displayable from 'zrender/src/graphic/Displayable';

export function isRect(display: Displayable): display is Rect {
  return display.type === 'rect';
}
export function isText(display: Displayable): display is Text {
  return display.type === 'text';
}
