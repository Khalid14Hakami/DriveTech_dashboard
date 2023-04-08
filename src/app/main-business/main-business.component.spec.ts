import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBusinessComponent } from './main-business.component';

describe('MainBusinessComponent', () => {
  let component: MainBusinessComponent;
  let fixture: ComponentFixture<MainBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
