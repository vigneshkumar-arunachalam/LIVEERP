import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractmasterfileComponent } from './contractmasterfile.component';

describe('ContractmasterfileComponent', () => {
  let component: ContractmasterfileComponent;
  let fixture: ComponentFixture<ContractmasterfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractmasterfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractmasterfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
