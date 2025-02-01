import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.isSubmitting = true;

    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.message = response.message || 'A password reset link has been sent to your email.';
        this.isSuccess = true;
        this.forgotPasswordForm.reset(); // Clear the form
      },
      error: (error) => {
        console.error('Error sending reset link:', error);
        this.isSubmitting = false;
        this.message = error.error?.message || 'Failed to send reset link. Please try again.';
        this.isSuccess = false;
      }
    });
  }
}
