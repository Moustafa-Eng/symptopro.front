import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AnalysisCbcResult } from '../interfaces/analysis-result';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {

  constructor(private http : HttpClient) { }
  private analysisResultSubject = new BehaviorSubject<AnalysisCbcResult | null>(null);
  analysisResult$ = this.analysisResultSubject.asObservable();

  uploadReport(formData: FormData): Observable<AnalysisCbcResult> {
    return this.http.post<AnalysisCbcResult>(`${environment.baseUrl}/MedicalReports/upload`, formData).pipe(
      tap(response => this.analysisResultSubject.next(response)),
      catchError(error => {
        console.error('Upload error:', error);
        this.analysisResultSubject.next(null);
        throw error; // Rethrow the error for the caller to handle
      })
    );
  }
}
