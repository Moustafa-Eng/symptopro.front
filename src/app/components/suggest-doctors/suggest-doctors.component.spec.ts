import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestDoctorsComponent } from './suggest-doctors.component';

describe('SuggestDoctorsComponent', () => {
  let component: SuggestDoctorsComponent;
  let fixture: ComponentFixture<SuggestDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
