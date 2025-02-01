import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  activeRoute:ActivatedRoute= inject(ActivatedRoute);



  ngOnInit(){
    this.activeRoute.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    })
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
