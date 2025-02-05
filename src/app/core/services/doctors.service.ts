import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private http: HttpClient) { }

  suggestDoctor(diseaseName:string): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${environment.baseUrl}/Doctors/suggest?diseaseName=${diseaseName}`);
  }
}
