import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

export interface Ingredient {
  id: number;
  name: string;
  type: string;
  nameAlias1: string;
  nameAlias2: string;
  nameAlias3: string;
  status: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  selected?: boolean;
}
@Component({
  selector: 'app-select-ingredient',
  templateUrl: './select-ingredient.component.html',
  styleUrls: ['./select-ingredient.component.scss'],
})
export class SelectIngredientComponent implements OnInit {
  ingredients: Ingredient[] = [];
  ingredientsCopy: Ingredient[] = [];
  showLoader = false;
  search = '';
  byUserSelectedIngredient: any[] = [];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private cmnService: CmnServiceService,
    public dialogRef: MatDialogRef<SelectIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedIngredients: any
  ) {}

  ngOnInit(): void {
    this.getIngredients();
  }
  remove(item: any): void {
    console.log(item, this.byUserSelectedIngredient);

    const index = this.byUserSelectedIngredient.indexOf(item);
    const indexOfCopy = this.ingredientsCopy.indexOf(item);

    if (index >= 0) {
      this.byUserSelectedIngredient.splice(index, 1);
    }
    console.log(indexOfCopy, this.byUserSelectedIngredient);

    if (indexOfCopy >= 0) {
      this.ingredientsCopy[indexOfCopy].selected = false;
    }
  }

  getIngredients() {
    this.cmnService.showLoader();
    this.showLoader = true;
    this.http.get(environment.apiUrl + 'ingredients/getAll').subscribe(
      (res: any) => {
        this.cmnService.hideLoader();
        this.showLoader = false;
        if (res?.success) {
          this.ingredients = res?.data;
          this.ingredientsCopy = res?.data;
          console.log(this.ingredientsCopy);
        }
      },
      (err) => {
        this.cmnService.hideLoader();
        this.showLoader = false;
      }
    );
  }
  onSaveClick() {
    let selectedIngredients = this.ingredients.filter((f) => f?.selected);
    if (!selectedIngredients.length) {
      this.cmnService.showWarning('Please select at least one ingredient');
      return;
    } else {
      selectedIngredients.forEach((ing: any) => {
        ing.selectedValue = '';
      });
      this.dialogRef.close(selectedIngredients);
    }
  }

  onIngredientSelected(e: any, ingredient: any) {
    ingredient.selected = e?.checked;
    const index = this.byUserSelectedIngredient.indexOf(ingredient);
    if (index < 0) {
      if (ingredient.selected) {
        this.byUserSelectedIngredient.push(ingredient);
      } else {
        this.byUserSelectedIngredient.splice(index, 1);
      }
    } else if (!ingredient.selected) {
      this.byUserSelectedIngredient.splice(index, 1);
    }
  }

  onSearch(searchStr: string) {
    if (searchStr.length > 0) {
      this.ingredientsCopy = this.ingredientsCopy.filter((filterValue) => {
        return filterValue.name
          .toLocaleLowerCase()
          .includes(searchStr.toLocaleLowerCase());
      });
    } else {
      this.ingredientsCopy = this.ingredients;
    }
  }
}
