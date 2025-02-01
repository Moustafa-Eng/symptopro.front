import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./shared/components/spinner/spinner.component";
import { SpinnerService } from './shared/services/spinner.service';

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

  constructor(private router: Router, private spinnerService: SpinnerService) {
  
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.showSpinner();
      }
      if(
        event instanceof NavigationEnd || 
        event instanceof NavigationError || 
        event instanceof NavigationCancel
      ){this.spinnerService.hideSpinner();}
  });
  
  // Subscribe to spinner state
  this.spinnerService.isLoading$.subscribe((loading) => {
    this.showSpinner = loading;
  });
}
}


