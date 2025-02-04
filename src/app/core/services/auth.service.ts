import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserData } from '../interfaces/user-data';
import { Gender } from '../Enums/gender';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Accounts/login`, data);
  }

  register(data: {
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: number;
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
    localStorage.removeItem('imagePath'); // Remove image on logout
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('dateOfBirth');
    localStorage.removeItem('userName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('gender');
    localStorage.removeItem('email');
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
    if(typeof localStorage !== undefined){
      
      const token = localStorage.getItem('token');
      if (token) {
        return this.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      }
    }
    return '';
  }

  setUserData(userData : UserData){
    if(typeof localStorage !== undefined){
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userName', userData.userName);
      localStorage.setItem('fullName', userData.fullName);
      localStorage.setItem('dateOfBirth', userData.dateOfBirth);
      localStorage.setItem('gender', userData.gender);
      localStorage.setItem('phoneNumber', userData.phoneNumber);
      localStorage.setItem('imagePath', userData.imagePath);

      // Decode token and set id and role and email
      const decodedToken = this.decodeToken(userData.token);
      localStorage.setItem('id', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      localStorage.setItem('role', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      localStorage.setItem('email', decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
    }
  }


  isLoggedIn(): boolean {
    if(typeof localStorage !== undefined){
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUserData(): UserData {
    return {
      id: localStorage.getItem('id')!,
      role: localStorage.getItem('role')!,
      fullName: localStorage.getItem('fullName')!,
      dateOfBirth: localStorage.getItem('dateOfBirth')!,
      userName: localStorage.getItem('userName')!,
      phoneNumber: localStorage.getItem('phoneNumber')!,
      gender: localStorage.getItem('gender')!,
      token: localStorage.getItem('token')!,
      imagePath: localStorage.getItem('imagePath')!,
      email: localStorage.getItem('email')!,
    };
  }
  
}
