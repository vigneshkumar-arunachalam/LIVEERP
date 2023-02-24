import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenutestComponent } from './menutest.component';

describe('MenutestComponent', () => {
  let component: MenutestComponent;
  let fixture: ComponentFixture<MenutestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenutestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenutestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
