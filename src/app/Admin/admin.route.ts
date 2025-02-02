// admin.routes.ts
import { Routes } from '@angular/router';
import { adminGuard } from './admin.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DoctorManagementComponent } from './components/doctor-management/doctor-management.component';
import { OverviewComponent } from './components/overview/overview.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [adminGuard], children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'users', component: UserManagementComponent},
      {path: 'doctors', component: DoctorManagementComponent},
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
    ]
  },
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];