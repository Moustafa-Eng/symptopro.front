// admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../core/Enums/userRole';
import { AuthService } from '../core/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUserRole() === UserRole.ADMIN) {
    return true;
  }
  return false;
};