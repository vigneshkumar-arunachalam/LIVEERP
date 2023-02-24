import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquotationnewComponent } from './addquotationnew.component';

describe('AddquotationnewComponent', () => {
  let component: AddquotationnewComponent;
  let fixture: ComponentFixture<AddquotationnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddquotationnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquotationnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
