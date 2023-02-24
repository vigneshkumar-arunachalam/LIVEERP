import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernewallComponent } from './customernewall.component';

describe('CustomernewallComponent', () => {
  let component: CustomernewallComponent;
  let fixture: ComponentFixture<CustomernewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomernewallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomernewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
