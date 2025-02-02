import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;
  isSubmitting = false;
  message: string = '';
  isSuccess: boolean = false;
  token: string = '';
  email: string = '';
  isValidToken: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.resetPasswordForm.controls;
  }

  ngOnInit(): void {
    // Extract token from the URL query parameters
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
    if (!this.token) {
      this.message = 'Invalid or missing reset token.';
      this.isSuccess = false;
      return;
    }

    // Validate the token with the backend
    this.validateToken();
  }

  validateToken() {
    this.authService.validateResetToken(this.token, this.email).subscribe({
      next: () => {
        this.isValidToken = true; // Token is valid, show the form
      },
      error: (error) => {
        this.message = 'Invalid or expired reset token.';
        this.isSuccess = false;
        this.isValidToken = false; // Token is invalid, hide the form
      }
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid || !this.token) {
      return; // Stop if the form is invalid or token is missing
    }

    this.isSubmitting = true;

    const resetData = {
      email: this.resetPasswordForm.value.email,
      token: this.token,
      newPassword: this.resetPasswordForm.value.newPassword
    };

    this.authService.resetPassword(resetData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.resetPasswordForm.reset();
        this.message = 'Password has been reset successfully.';
        this.isSuccess = true;
        setTimeout(() => this.router.navigate(['/auth/login']), 2000); // Redirect to login after 2 seconds
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        this.isSubmitting = false;
        this.message = error.error?.message || 'Failed to reset password. Please try again.';
        this.isSuccess = false;
      }
    });
  }
  
}
