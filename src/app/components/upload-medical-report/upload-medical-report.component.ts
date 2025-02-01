import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalReportService } from '../../core/services/medical-report.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GoBackComponent } from "../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-upload-medical-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, GoBackComponent],
  templateUrl: './upload-medical-report.component.html',
  styleUrl: './upload-medical-report.component.scss'
})
export class UploadMedicalReportComponent {

  uploadForm: FormGroup;
  file: File | null = null;
  maxFileSize = 5 * 1024 * 1024; // 5MB
  isLoading = false;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private medicalReportService: MedicalReportService
  ) {
    this.uploadForm = this.fb.group({
      reportFile: ['', Validators.required]
    });
  }

  isPdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }
  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.size <= this.maxFileSize) {
      this.file = file;
    } else {
      this.file = null;
    }
  }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (!this.file) {
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.file);

    this.medicalReportService.uploadReport(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Report uploaded successfully!';
        this.resetForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to upload report. Please try again.';
        console.error('Upload error:', error);
      }
    });
  }

  // Reset form after successful upload
  resetForm(): void {
    this.uploadForm.reset();
    this.file = null;
    this.submitted = false;
  }
}
