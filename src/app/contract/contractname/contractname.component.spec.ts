import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractnameComponent } from './contractname.component';

describe('ContractnameComponent', () => {
  let component: ContractnameComponent;
  let fixture: ComponentFixture<ContractnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
