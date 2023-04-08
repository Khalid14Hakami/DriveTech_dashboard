import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDishComponent } from './report-dish.component';

describe('ReportDishComponent', () => {
  let component: ReportDishComponent;
  let fixture: ComponentFixture<ReportDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
