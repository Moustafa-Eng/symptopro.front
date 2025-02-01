import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {

  constructor(private http : HttpClient) { }


  uploadReport(formData: FormData) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/MedicalReports/upload`, formData);
  }

}
