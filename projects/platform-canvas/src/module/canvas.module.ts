import { NgModule, ɵINJECTOR_SCOPE } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationModule } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { CanvasRendererFactory } from './canvas-renderer.factory';
import { RendererFactory2 } from '@angular/core';
import { CanvasZrenderService } from './canvas-zrender';
export function errorHandler(): ErrorHandler {
  return new ErrorHandler();
}

@NgModule({
  providers: [
    { provide: ɵINJECTOR_SCOPE, useValue: 'root' },
    CanvasZrenderService,
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    { provide: CanvasRendererFactory, useClass: CanvasRendererFactory },
    { provide: RendererFactory2, useExisting: CanvasRendererFactory },
  ],
  exports: [CommonModule, ApplicationModule],
})
export class CanvasModule {}
