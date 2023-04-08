import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedDishesComponent } from './reported-dishes.component';

describe('ReportedDishesComponent', () => {
  let component: ReportedDishesComponent;
  let fixture: ComponentFixture<ReportedDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
