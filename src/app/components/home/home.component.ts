import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactusComponent } from "../contactus/contactus.component";
import { GetStartComponent } from "../get-start/get-start.component";
import { AboutComponent } from "../about/about.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GetStartComponent, ContactusComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
