import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PredictionResult } from '../interfaces/prediction-result';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  private predictionResultSubject = new BehaviorSubject<PredictionResult | null>(null);
  predictionResult$ = this.predictionResultSubject.asObservable();
  


  constructor(private http: HttpClient) { }

// Updated to accept 'data' as an array of 0s and 1s
  getPredictions(data: { data: number[] }): void {
    this.http.post<PredictionResult>(`${environment.baseUrl}/Predictions/Predict`, data).subscribe({
      next: (result) => {
        this.predictionResultSubject.next(result);
      },
      error: (error) => {
        this.predictionResultSubject.next(null);
      }
    });
  }
}
