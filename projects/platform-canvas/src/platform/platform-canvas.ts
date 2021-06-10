import { StaticProvider } from '@angular/core';
import { createPlatformFactory } from '@angular/core';
import { platformCore } from '@angular/core';
let providers: StaticProvider[] = [];
export const platformCanvas = createPlatformFactory(
  platformCore,
  'terminalDynamic',
  providers
);
