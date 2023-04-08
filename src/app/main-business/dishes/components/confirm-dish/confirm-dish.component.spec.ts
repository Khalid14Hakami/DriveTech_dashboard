import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDishComponent } from './confirm-dish.component';

describe('ConfirmDishComponent', () => {
  let component: ConfirmDishComponent;
  let fixture: ComponentFixture<ConfirmDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
