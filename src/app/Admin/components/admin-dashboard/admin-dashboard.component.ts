import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  profileImage: string = '';
  
  constructor(private _authService: AuthService, private _router: Router) {
    this.profileImage = this._authService.getUserData().imagePath;
  }
  
  
  
  logout()  {
    this._authService.logout().subscribe(() => this._router.navigate(['/']));
  }


  openProfilePage() {}



}
