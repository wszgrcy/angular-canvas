import { NgModule } from '@angular/core';
import { CanvasModule } from 'platform-canvas';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CanvasModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
