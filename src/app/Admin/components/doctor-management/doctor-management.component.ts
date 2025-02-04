import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoBackComponent } from "../../../shared/components/go-back/go-back.component";
import { AdminService } from '../../services/admin.service';
import { AddDoctorComponent } from "../add-doctor/add-doctor.component";
import { PopupMessageComponent } from "../../../shared/components/popup-message/popup-message.component";
import { EditDoctorComponent } from "../edit-doctor/edit-doctor.component";
import { Doctor } from '../../../core/interfaces/doctor';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
  imports: [CommonModule, GoBackComponent, AddDoctorComponent, PopupMessageComponent, EditDoctorComponent],
  templateUrl: './doctor-management.component.html',
  styleUrl: './doctor-management.component.scss'
})
export class DoctorManagementComponent {
  selectedDoctor!: Doctor;
  editDoctorId: string = '';
  showAddDoctor:boolean = false;
  showEditDoctor:boolean = false;
  showPopup: boolean = false;
  message: string = '';
  popupType: 'success' | 'error' = 'success';

  doctors:Doctor[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllDoctors().subscribe(res => {
      this.doctors = res;
    });
  }

  onEdit(doctor : Doctor): void {
    this.showEditDoctor = false;
    this.adminService.updateDoctor(doctor, this.editDoctorId).subscribe(res => {
      this.message = 'Doctor updated successfully.';
      this.doctors = this.doctors.map(d => d.id === this.editDoctorId ? res : d);
      this.showSuccessPopup();
      setTimeout(() => {this.showPopup = false;}, 2000);
    }, err => {
      this.message = err.error.message || 'Something went wrong. Please try again.'; 
      this.showErrorPopup();
      setTimeout(() => this.showPopup = false, 2000);
    })
  }

  onDelete(doctorId: string): void {
    this.adminService.deleteDoctor(doctorId).subscribe({
      next: res => {
        this.message = res.message || 'Doctor deleted successfully.';
        // Remove the deleted doctor from the list
        this.doctors = this.doctors.filter(d => d.id !== doctorId);
        this.showSuccessPopup();
        setTimeout(() => {this.showPopup = false;}, 2000);
      },
      error: err => {
        this.message = err.error.message || 'Something went wrong. Please try again.'; 
        this.showErrorPopup();
        setTimeout(() => this.showPopup = false, 2000);
      }
    })
  }

  showDoctorPopup(): void {
    this.showAddDoctor = true;
  }

showEditDoctorPopup(doctorId : string): void {
  this.showEditDoctor = true;
  this.editDoctorId = doctorId;
  this.selectedDoctor = this.doctors.find(doctor => doctor.id === doctorId)!;
}

  onCancel(): void {
    this.showAddDoctor = false;
    this.showEditDoctor = false;
  }

  addDoctor(doctor: Doctor): void {
    console.log(doctor);
    this.showAddDoctor = false;
    this.adminService.addDoctor(doctor).subscribe({
      next: res => {
        this.message = 'Doctor added successfully.';
        this.doctors.push(res);
        this.showSuccessPopup();
        setTimeout(() => {this.showPopup = false;}, 2000);
      },
      error: err => {
        this.message = err.error.message || 'Something went wrong. Please try again.'; 
        this.showErrorPopup();
        setTimeout(() => this.showPopup = false, 2000);
      }
    })
  }

 // Show a success pop-up
 showSuccessPopup(): void {
  this.showPopup = true;
  //this.message = 'Doctor added successfully.';
  this.popupType = 'success';
}

// Show an error pop-up
showErrorPopup(): void {
  //this.message = 'Something went wrong. Please try again.';
  this.showPopup = true;    
  this.popupType = 'error';
}
}
