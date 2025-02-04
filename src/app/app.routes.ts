import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { EmailconfirmationComponent } from './components/emailconfirmation/emailconfirmation.component';
import { GetsymptomsComponent } from './components/getsymptoms/getsymptoms.component';
import { authGuard } from './core/guards/auth.guard';
import { logedinGuard } from './core/guards/logedin.guard';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UploadMedicalReportComponent } from './components/upload-medical-report/upload-medical-report.component';
import { AnalysisResultComponent } from './components/analysis-result/analysis-result.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import { SuggestDoctorsComponent } from './components/suggest-doctors/suggest-doctors.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { adminGuard } from './Admin/admin.guard';

export const routes: Routes = [

  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthLayoutComponent,canActivate: [logedinGuard], children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'emailconfirmation', component: EmailconfirmationComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
  ]},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '', component : BlankLayoutComponent,canActivate: [authGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'get-symptoms', component: GetsymptomsComponent},
    {path: 'prediction-result', component: PredictionResultComponent},
    {path: 'upload-medical-report', component: UploadMedicalReportComponent},
    {path: 'analysis-result', component: AnalysisResultComponent},
    {path: 'suggest-doctors', component: SuggestDoctorsComponent},
  ]},

  {path:'user-profile/:id', component: UserProfileComponent, canActivate: [authGuard]},

  {path: 'admin', canActivate: [adminGuard], loadChildren: () => import('./Admin/admin.route').then(m => m.ADMIN_ROUTES)},
  {path: '**', component: NotfoundComponent}
];
