import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIngredientComponent } from './select-ingredient.component';

describe('SelectIngredientComponent', () => {
  let component: SelectIngredientComponent;
  let fixture: ComponentFixture<SelectIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
