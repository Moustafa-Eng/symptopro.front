import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoBackComponent } from "../../../shared/components/go-back/go-back.component";
import { AllDoctors } from '../../interfaces/all-doctors';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
  imports: [CommonModule, GoBackComponent],
  templateUrl: './doctor-management.component.html',
  styleUrl: './doctor-management.component.scss'
})
export class DoctorManagementComponent {

  doctors:AllDoctors[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllDoctors().subscribe(res => {
      console.log(res);
      this.doctors = res;
    });
  }

  onEdit(doctorId: string): void {
    // TODO: Implement edit functionality for a specific doctor
  }

  onDelete(doctorId: string): void {
    this.adminService.deleteDoctor(doctorId).subscribe(res => {
      console.log(res);
    })
  }

  onAddDoctor(): void {
    // TODO: Implement add doctor functionality
  }

}
