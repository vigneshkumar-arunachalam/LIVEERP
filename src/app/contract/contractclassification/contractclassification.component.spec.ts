import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractclassificationComponent } from './contractclassification.component';

describe('ContractclassificationComponent', () => {
  let component: ContractclassificationComponent;
  let fixture: ComponentFixture<ContractclassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractclassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
