import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditquotationnewComponent } from './editquotationnew.component';

describe('EditquotationnewComponent', () => {
  let component: EditquotationnewComponent;
  let fixture: ComponentFixture<EditquotationnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditquotationnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditquotationnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
