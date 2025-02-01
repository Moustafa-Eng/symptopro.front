import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMedicalReportComponent } from './upload-medical-report.component';

describe('UploadMedicalReportComponent', () => {
  let component: UploadMedicalReportComponent;
  let fixture: ComponentFixture<UploadMedicalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMedicalReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadMedicalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
