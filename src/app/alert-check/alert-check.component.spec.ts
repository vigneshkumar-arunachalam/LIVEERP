import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCheckComponent } from './alert-check.component';

describe('AlertCheckComponent', () => {
  let component: AlertCheckComponent;
  let fixture: ComponentFixture<AlertCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
