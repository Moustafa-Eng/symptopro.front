import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserHistory } from '../interfaces/userHistory';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserHistory(userId: string): Observable<UserHistory[]> {
    return this.http.get<UserHistory[]>(`${environment.baseUrl}/users/${userId}`);
  }

  uploadProfileImage(formData:FormData): Observable<any> {
    return this.http.post(`${environment.baseUrl}/users/upload`, formData);
  }
}
