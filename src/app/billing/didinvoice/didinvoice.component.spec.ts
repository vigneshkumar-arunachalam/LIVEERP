import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidinvoiceComponent } from './didinvoice.component';

describe('DidinvoiceComponent', () => {
  let component: DidinvoiceComponent;
  let fixture: ComponentFixture<DidinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DidinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DidinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
