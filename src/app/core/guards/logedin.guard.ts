import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const logedinGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    if(localStorage.getItem('token') !== null) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};