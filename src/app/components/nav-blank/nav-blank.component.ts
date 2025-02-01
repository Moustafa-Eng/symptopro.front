import { Component, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../core/environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
  profileImage: any = '';
  constructor(private _router: Router, private _authService: AuthService) {
    this._router.events.subscribe(() => this.closeNavbar());
  }


  logout() {
    this._authService.logout().subscribe(() => this._router.navigate(['/']));
  }


  closeNavbar() {
    let navbarCollapse: any;
    if(isPlatformBrowser(PLATFORM_ID)){
     navbarCollapse = document.querySelector('.navbar-collapse');
    }
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }

  ngOnInit(): void {
      this.profileImage = this._authService.getProfileImage();
  }
}
