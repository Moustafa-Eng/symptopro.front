import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {

  constructor(private http : HttpClient) { }


  uploadReport(formData: FormData) : Observable<any> {
    return this.http.post(`${environment.baseUrl}/MedicalReports/upload`, formData);
  }

}
