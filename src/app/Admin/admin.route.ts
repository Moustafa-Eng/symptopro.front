// admin.routes.ts
import { Routes } from '@angular/router';
import { adminGuard } from './admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [adminGuard],
  },
  // {
  //   path: 'users',
  //   loadComponent: () =>
  //     import('./user-management/user-management.component').then(
  //       (m) => m.UserManagementComponent
  //     ),
  // },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];