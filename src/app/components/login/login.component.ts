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
        this.message = response.message || 'Login successfully.';
        this.showSuccessPopup();
        this.authService.setUserData(response);
        setTimeout(() => {
          if(this.authService.getUserData().role === UserRole.ADMIN) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        },1000);
        
        this.isSubmitting = false;
      },
      error: (error) => {
        this.isSubmitting = false;
        this.message = error.error?.message || 'Login failed. Please try again.';
        this.showErrorPopup();
        setTimeout(() => this.showPopup = false, 1500);
      }
    });
  }



   // Show a success pop-up
   showSuccessPopup(): void {
    this.showPopup = true;
    //this.message = 'Login successfully.';
    this.isSuccess = true;
    this.popupType = 'success';
  }

  // Show an error pop-up
  showErrorPopup(): void {
    //this.message = 'Something went wrong. Please try again.';
    this.isSuccess = false;
    this.showPopup = true;    
    this.popupType = 'error';
  }


}
