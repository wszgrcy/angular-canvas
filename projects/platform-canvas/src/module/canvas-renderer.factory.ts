import {
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
  RendererType2,
} from '@angular/core';
import { Injectable } from '@angular/core';
import { CanvasRenderer } from './canvas-render';
import { CanvasZrenderService } from './canvas-zrender';

@Injectable()
export class CanvasRendererFactory implements RendererFactory2 {
  private rendererByCompId = new Map<string, Renderer2>();
  private defaultRenderer!: Renderer2;

  constructor(private canvasZrender:CanvasZrenderService) {
    this.defaultRenderer = new CanvasRenderer(canvasZrender);
  }

  createRenderer(element: any, type: RendererType2 | null): Renderer2 {
    return this.defaultRenderer;
  }

  begin() {}
  end() {}
}
