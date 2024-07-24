import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DataService, DataServiceBrowser } from './data.service'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), {
    provide: DataService,
    useClass: DataServiceBrowser
  },
  {
    provide: APP_INITIALIZER,
    deps: [DataService],
    useFactory: (ds: DataService) => async () => await ds.load(),
    multi: true
  }]
};
