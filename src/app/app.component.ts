import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'symptopro';
  showSpinner = false;

  constructor(private router: Router, private authService: AuthService) {
  
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
        },1000)
      }
      if(
        event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ){this.showSpinner = false;}
  });
  
  // // Subscribe to spinner state
  // this.spinnerService.isLoading$.subscribe((loading) => {
  //   this.showSpinner = loading;
  // });
}
}


