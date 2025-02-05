import { CommonModule } from '@angular/common';
import { PredictionResult } from './../../core/interfaces/prediction-result';
import { PredictionsService } from './../../core/services/predictions.service';
import { Component } from '@angular/core';
import { GoBackComponent } from "../../shared/components/go-back/go-back.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-prediction-result',
  standalone: true,
  imports: [CommonModule, GoBackComponent],
  templateUrl: './prediction-result.component.html',
  styleUrl: './prediction-result.component.scss'
})
export class PredictionResultComponent {

  predictionResult!: PredictionResult | null;
  errorMessage: string = '';

  constructor(private predictionsService: PredictionsService, private router: Router) { }


  ngOnInit() {
    this.predictionsService.predictionResult$.subscribe({
      next: (result) => {
        this.predictionResult = result;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = "Failed to get prediction result. Please try again.";
      }
    });
  }


  openDoctorSuggestion() {
    // navigate with diseaseName
    this.router.navigate(['/suggest-doctors'], { queryParams: { disease: this.predictionResult?.disease } });
  }

}
