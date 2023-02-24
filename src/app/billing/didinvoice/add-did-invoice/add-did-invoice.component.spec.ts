import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDidInvoiceComponent } from './add-did-invoice.component';

describe('AddDidInvoiceComponent', () => {
  let component: AddDidInvoiceComponent;
  let fixture: ComponentFixture<AddDidInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDidInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDidInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
