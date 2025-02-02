import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const logedinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const _router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    
  if (authService.isLoggedIn()) {
    _router.navigate(['/home']);
    return false;
  }

  }
  return true;


};