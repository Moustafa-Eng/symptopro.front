import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { httpSpinnerInterceptor } from './shared/interceptors/http-spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,  withHashLocation()), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([headersInterceptor, httpSpinnerInterceptor]))],
};
