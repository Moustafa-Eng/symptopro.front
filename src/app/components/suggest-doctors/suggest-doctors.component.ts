import { Component } from '@angular/core';
import { GoBackComponent } from "../../shared/components/go-back/go-back.component";
import { DoctorsService } from '../../core/services/doctors.service';
import { Doctor } from '../../core/interfaces/doctor';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggest-doctors',
  standalone: true,
  imports: [GoBackComponent, CommonModule],
  templateUrl: './suggest-doctors.component.html',
  styleUrl: './suggest-doctors.component.scss'
})
export class SuggestDoctorsComponent {

  suggestedDoctors: Doctor[] = [];
  diseaseName: string = '';
  errorMessage: string = '';
  constructor(private doctorService: DoctorsService, private route: ActivatedRoute){}


  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.diseaseName = params['disease']; // Get the disease parameter
      if (this.diseaseName) {
        this.getSuggestedDoctors(this.diseaseName); // Call the doctor service with the disease name
      }
    });
  }


  getSuggestedDoctors(diseaseName: string) {
    this.doctorService.suggestDoctor(diseaseName).subscribe(
      (doctors) => {
        this.suggestedDoctors = doctors;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
