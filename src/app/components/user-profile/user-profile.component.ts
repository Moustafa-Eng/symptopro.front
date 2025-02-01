import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Userprofile } from '../../core/interfaces/userprofile';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Gender } from '../../core/Enums/gender';
import { FooterComponent } from "../footer/footer.component";
import { GoBackComponent } from "../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FooterComponent, GoBackComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  @ViewChild('fileInput') fileInput: any; // Reference to the file input element
  userProfile!:Userprofile;

  constructor(private userService: UserService, private activatedRoute:ActivatedRoute, private authService:AuthService) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['id'];
      this.userService.getUserProfile(userId).subscribe(userProfile => {
        this.userProfile = userProfile;
        this.userProfile.imagePath = this.authService.getProfileImage();
      });
    });
  }

  getGenderString(gender: number): string {
    switch(gender) {
      case Gender.Male:
        return 'Male';
      case Gender.Female:
        return 'Female';
      default:
        return 'Unknown';
    }
  }

  // Trigger file input click
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadProfileImage(file);
    }
  }

  // Upload profile image
  uploadProfileImage(file: File): void {
    const formData = new FormData();
    formData.append('Image', file);

    // Call the service to upload the image
    this.userService.uploadProfileImage(formData).subscribe(
      (response) => {
        console.log('Profile image uploaded successfully:', response);
        // Update the user profile image path
        if (this.userProfile) {
          this.authService.setProfileImage(response.imagePath); // Assuming the backend returns the new image URL
          this.userProfile.imagePath = this.authService.getProfileImage();

          console.log(this.userProfile.imagePath);
        }
      },
      (error) => {
        console.error('Error uploading profile image:', error);
      }
    );
  }
}
