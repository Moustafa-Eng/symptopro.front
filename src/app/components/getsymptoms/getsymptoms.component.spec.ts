import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsymptomsComponent } from './getsymptoms.component';

describe('GetsymptomsComponent', () => {
  let component: GetsymptomsComponent;
  let fixture: ComponentFixture<GetsymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetsymptomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetsymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
