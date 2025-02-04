import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../core/interfaces/doctor';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.scss'
})
export class EditDoctorComponent {
  @Input() doctor!: Doctor;
  @Output() editDoctorEvent = new EventEmitter<Doctor>();
  @Output() cancelEvent = new EventEmitter<void>();
  specialties: string[] = [
    'Cardiology', 'Dermatology', 
    'Neurology', 'Urology	', 'Orthopedics', 
    'Pulmonology'	, 'Endocrinology'	, 'Gastroenterology'	
    , 'Infectious Disease', 'Proctology', 'Allergy and Immunology']; // Specialties list

  doctorForm!: FormGroup;

  constructor(private fb:FormBuilder) { 

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required]
      })
    });
  }


  ngOnInit() {
    this.doctorForm = this.fb.group({
      name: [this.doctor.name, Validators.required],
      specialty: [this.doctor.specialty, Validators.required],
      phone: [this.doctor.phone, [Validators.required,]],
      email: [this.doctor.email, [Validators.required, Validators.email]],
      address: [this.doctor.address, Validators.required]
    });
  }



  editDoctor(): void {
    if (this.doctorForm.valid) {
      console.log(this.doctorForm.value);
      this.editDoctorEvent.emit(this.doctorForm.value);
    }
  }

  cancel(): void {
    this.cancelEvent.emit();
  }
}
