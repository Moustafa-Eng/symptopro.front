import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRole } from '../../core/Enums/userRole';
import { AuthService } from '../../core/services/auth.service';
import { PopupMessageComponent } from "../../shared/components/popup-message/popup-message.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PopupMessageComponent]
})
export class LoginComponent {


  // Pop-up variables
  showPopup: boolean = false;
  popupType: 'success' | 'error' | 'info' = 'info';
  message: string = '';


  isSubmitting = false;
  loginForm: FormGroup;
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Helper method for easy access to form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Stop if the form is invalid
    }
    this.isSubmitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.showSuccessPopup();
        this.authService.setCurrentUserData(response);
        const user = this.authService.decodeToken(response.token);
        const userRole = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        this.authService.setToken(response.token);
        this.authService.setProfileImage(response.imagePath);
        this.isSuccess = true;
        if(userRole === UserRole.ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          setTimeout(() => {
            this.isSubmitting = false;
            this.router.navigate(['/home']);
          
          }, 2000); // Redirect after 2 seconds
        }
      },
      error: (error) => {
        this.showErrorPopup();
        this.isSubmitting = false;
        this.message = error.error?.message || 'Login failed. Please try again.';
        this.isSuccess = false;
      }
    });
  }



   // Show a success pop-up
   showSuccessPopup(): void {
     this.showPopup = true;
    this.message = 'Login successfully.';
    this.isSuccess = true;
    this.popupType = 'success';
  }

  // Show an error pop-up
  showErrorPopup(): void {
    this.message = 'Something went wrong. Please try again.';
    this.isSuccess = false;
    this.showPopup = true;    
    this.popupType = 'error';
  }


  onPopupClose(){
    this.showPopup = false;
  }
}
