import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  constructor(private http: HttpClient) { }

// Updated to accept 'data' as an array of 0s and 1s
  getPredictions(data: { data: number[] }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Predictions/Predict`, data);
  }
}
