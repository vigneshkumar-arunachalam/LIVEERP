import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDidInvoiceComponent } from './edit-did-invoice.component';

describe('EditDidInvoiceComponent', () => {
  let component: EditDidInvoiceComponent;
  let fixture: ComponentFixture<EditDidInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDidInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDidInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
