import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { platformCanvas } from 'platform-canvas';
if (environment.production) {
  enableProdMode();
}

platformCanvas()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
