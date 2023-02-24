import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationnewComponent } from './quotationnew.component';

describe('QuotationnewComponent', () => {
  let component: QuotationnewComponent;
  let fixture: ComponentFixture<QuotationnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
