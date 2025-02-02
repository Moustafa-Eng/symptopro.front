import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emailconfirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emailconfirmation.component.html',
  styleUrl: './emailconfirmation.component.scss'
})
export class EmailconfirmationComponent {




  confirmationForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.confirmationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // 6-digit code
    });
  }

  onSubmit() {
    if (this.confirmationForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    this.isSubmitting = true;

    this.authService.verifyEmailConfirmation(this.confirmationForm.value).subscribe({
      next: () => {
        alert('Email verified successfully!');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Verification failed. Please check the code and try again.');
      },
      complete: () => (this.isSubmitting = false),
    });
  }

  // Helper method to access form controls
  get f() {
    return this.confirmationForm.controls;
  }

  
}
