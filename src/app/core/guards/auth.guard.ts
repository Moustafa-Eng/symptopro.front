import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const platformId = inject(PLATFORM_ID);

// Use Platform ID to check if the code is running in the browser or on the server
  if (isPlatformBrowser(platformId)) {
    if(localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }

};
