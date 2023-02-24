import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPIComponent } from './edit-pi.component';

describe('EditPIComponent', () => {
  let component: EditPIComponent;
  let fixture: ComponentFixture<EditPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
