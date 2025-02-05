import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Doctor } from '../../core/interfaces/doctor';
import { AllUsers } from '../interfaces/all-users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<AllUsers[]> {
    return this.http.get<AllUsers[]>(`${environment.baseUrl}/users`);
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${environment.baseUrl}/doctors`);
  }


  getCountOfUsers(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/users/count`);
  }

  getCountOfDoctors(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/doctors/count`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/users/${userId}`);
  }

  deleteDoctor(doctorId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/doctors/${doctorId}`);
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${environment.baseUrl}/doctors`, doctor);
  }

  updateDoctor(doctor: Doctor, doctorId: string): Observable<Doctor> {
    return this.http.put<Doctor>(`${environment.baseUrl}/doctors/${doctorId}`, doctor);
  }
}
