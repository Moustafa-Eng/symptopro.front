import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userprofile } from '../interfaces/userprofile';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<Userprofile> {
    return this.http.get<Userprofile>(`${environment.baseUrl}/users/${userId}`);
  }

  uploadProfileImage(formData:FormData): Observable<any> {
    return this.http.post(`${environment.baseUrl}/users/upload`, formData);
  }
}
