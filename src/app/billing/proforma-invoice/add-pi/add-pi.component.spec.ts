import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPIComponent } from './add-pi.component';

describe('AddPIComponent', () => {
  let component: AddPIComponent;
  let fixture: ComponentFixture<AddPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
