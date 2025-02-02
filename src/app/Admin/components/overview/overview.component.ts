import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  userCount!: number; // Replace with dynamic data from an API
  doctorCount!: number; // Replace with dynamic data from an API

  constructor(private adminService: AdminService) {
    this.adminService.getCountOfUsers().subscribe(res => {
      this.userCount = res.count
    });

    this.adminService.getCountOfDoctors().subscribe(res => {
      this.doctorCount = res.count
    });
  }
}
