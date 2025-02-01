import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { GoBackComponent } from "../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-get-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './get-start.component.html',
  styleUrl: './get-start.component.scss'
})
export class GetStartComponent {

}
