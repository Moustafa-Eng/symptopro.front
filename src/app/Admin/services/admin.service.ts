import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../core/environments/environment';
import { AllUsers } from '../interfaces/all-users';
import { Observable } from 'rxjs';
import { AllDoctors } from '../interfaces/all-doctors';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<AllUsers[]> {
    return this.http.get<AllUsers[]>(`${environment.baseUrl}/users`);
  }

  getAllDoctors(): Observable<AllDoctors[]> {
    return this.http.get<AllDoctors[]>(`${environment.baseUrl}/doctors`);
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
}
