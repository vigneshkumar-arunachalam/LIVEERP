import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractliveComponent } from './contractlive.component';

describe('ContractliveComponent', () => {
  let component: ContractliveComponent;
  let fixture: ComponentFixture<ContractliveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractliveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
