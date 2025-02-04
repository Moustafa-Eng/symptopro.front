import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../core/interfaces/doctor';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class AddDoctorComponent {
  @Output() addDoctorEvent = new EventEmitter<Doctor>();
  @Output() cancelEvent = new EventEmitter<void>();
  specialties: string[] = [
    'Cardiology', 'Dermatology',
    'Neurology', 'Urology', 'Orthopedics',
    'Pulmonology', 'Endocrinology', 'Gastroenterology',
    'Infectious Disease', 'Proctology', 'Allergy and Immunology'
  ]; // Specialties list

  doctorForm!: FormGroup;

  constructor(private fb:FormBuilder) { 

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }


  addDoctor(): void {
    if (this.doctorForm.valid) {
      console.log(this.doctorForm.value);
      this.addDoctorEvent.emit(this.doctorForm.value);
    }
  }

  cancel(): void {
    this.cancelEvent.emit();
  }
}
