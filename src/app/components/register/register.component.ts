import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupMessageComponent } from '../../shared/components/popup-message/popup-message.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PopupMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    // Pop-up variables
    showPopup: boolean = false;
    popupType: 'success' | 'error' | 'info' = 'info';
    message: string = '';
    isSuccess: boolean = false;


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
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          this.message = response.message || ('Registration successful! Please verify your email.');
          this.showSuccessPopup();
          setTimeout(() => {
            this.showPopup = false;
            this.router.navigate(['/auth/emailconfirmation']);
          }, 1500);
          
        },
        (error) => {
          this.message = error.error?.message || 'Registration failed. Please try again.';
          this.showErrorPopup();
          setTimeout(() => this.showPopup = false, 1500);
        }
      );
    } else {
      this.message = 'Please fill out the form correctly.';
      this.showErrorPopup();
    }
  }

  // Helper method for easy access to form controls in the template
  get f() {
    return this.registerForm.controls;
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
