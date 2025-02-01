import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserData } from '../interfaces/user-data';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser!:UserData;

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Accounts/login`, data);
  }

  register(data: {
    fullName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Accounts/register`, data);
  }

  verifyEmailConfirmation(data: { email: string; verificationCode: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Accounts/emailconfirmation`, data);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('profileImage'); // Remove image on logout
}

  logout() {
    this.removeToken();
    return this.http.post(`${environment.baseUrl}/Accounts/SignOut`, {});
  }


  forgotPassword(email:string ): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Accounts/forgotpassword`, { email });
  }

  resetPassword(resetData: { email: string, token: string, newPassword: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Accounts/resetpassword`, { email: resetData.email, token: resetData.token, newPassword: resetData.newPassword });
  }

  validateResetToken(token: string, email: string): Observable<any> {
    console.log(token);
    return this.http.get(`${environment.baseUrl}/Accounts/validateresettoken`, { params: { token, email } });
  }


  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return this.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return '';
  }

  setCurrentUserData(userData : UserData){
    this.currentUser = userData;
  }
  getUserFullName(): string {
    return this.currentUser.fullName;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  // Store profile image URL
  setProfileImage(imageUrl: string): void {

      return localStorage.setItem('profileImage', imageUrl);

  }

  // Get profile image URL
  getProfileImage(): string | null {
    return localStorage.getItem('profileImage') || null;
  }


  setToken(token: string): void {
      localStorage.setItem('token', token);
  }


}
