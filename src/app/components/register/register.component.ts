import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful! Please verify your email.');
          this.router.navigate(['/emailconfirmation']);
        },
        (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Helper method for easy access to form controls in the template
  get f() {
    return this.registerForm.controls;
  }
  
}
