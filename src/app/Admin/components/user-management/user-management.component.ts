import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoBackComponent } from "../../../shared/components/go-back/go-back.component";
import { AllUsers } from '../../interfaces/all-users';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, GoBackComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

  users:AllUsers[] = [];

  constructor(private adminService: AdminService) { }


  ngOnInit() {
    this.adminService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

// Handle Delete Action
onDelete(userId: string): void {
  this.adminService.deleteUser(userId).subscribe(res => {
    console.log(res);
  })
}

// Handle Edit Action
onEdit(userId: string): void {
  console.log(`Edit user with ID ${userId}`);
  // Add logic to navigate to an edit page or open a modal
}

// Handle View History Action
onViewHistory(userId: string): void {
  console.log(`View history for user with ID ${userId}`);
  // Add logic to navigate to a history page or open a modal
}
}
