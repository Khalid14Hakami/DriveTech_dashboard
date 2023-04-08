import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss'],
})
export class AddMenuItemComponent implements OnInit {
  addNew = false;
  category = '';
  dishName = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientControl = new FormControl('');
  filteredIngredients: any[] = [];
  ingredients: any[] = [];
  allIngredients: any[] = [];

  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public cmnService: CmnServiceService,
    @Inject(MAT_DIALOG_DATA) public menuData: any
  ) {
    this.ingredientControl.valueChanges.subscribe((res: string) => {
      if (res && res.length > 0) {
        this.filteredIngredients = this.allIngredients;
        this.filteredIngredients = this.filteredIngredients.filter(
          (ingredient) =>
            ingredient?.name
              ?.toLowerCase()
              .includes(res?.trim()?.toLocaleLowerCase())
        );
      } else {
        this.filteredIngredients = this.allIngredients;
      }
    });
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.cmnService.showLoader();

    this.http.get(environment.apiUrl + 'ingredients/getAll').subscribe(
      (res: any) => {
        this.cmnService.hideLoader();

        if (res?.success) {
          this.filteredIngredients = res?.data;
          this.allIngredients = res?.data;
        }
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.value);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientControl.setValue(null);
  }

  onAddMenuClicked() {
    if (!this.category.trim()) {
      this.cmnService.showWarning('Please enter category/');
      return;
    }

    if (!this.dishName.trim()) {
      this.cmnService.showWarning('Please enter dish name.');
      return;
    }

    if (!this.ingredients.length) {
      this.cmnService.showWarning('Please select at least one ingredient');
      return;
    }

    let ingredient = this.ingredients.map((i) => i?.id);

    const data = {
      category: this.category,
      name: this.dishName,
      selectedIngredients: ingredient,
      businessProfileId: this.menuData?.id,
    };
    this.cmnService.showLoader();
    this.http
      .post(environment.apiUrl + 'BusinessMenus/AddMenu', data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.cmnService.showSuccess(res?.message);

            if (this.addNew) {
              this.clear();
            } else {
              this.dialog.closeAll();
            }
          }
          this.cmnService.hideLoader();
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  clear() {
    this.addNew = true;
    this.dishName = '';
    this.category = '';
    this.ingredients = [];
  }
}
