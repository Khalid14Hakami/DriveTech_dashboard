import { COMMA, ENTER, J, P } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Observable } from 'rxjs';
import { validTypes } from 'src/app/common/common.model';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';
import { ReportDishComponent } from '../report-dish/report-dish.component';
import { SelectIngredientComponent } from '../select-ingredient/select-ingredient.component';
import { map, startWith } from 'rxjs/operators';
export interface Menu {
  dishName: string;
  menuId: number;
  selectedIngredients: any[];
}
@Component({
  selector: 'app-confirm-dish',
  templateUrl: './confirm-dish.component.html',
  styleUrls: ['./confirm-dish.component.scss'],
})
export class ConfirmDishComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  menuId = 0;
  selectedMenuId = 0;
  validTypes = validTypes;
  ratingObj: any;
  dishName = new FormControl();
  dishNameValue = '';
  ratingId: any;
  date: any;
  showSelectIngredients = true;
  image = '';
  menus = [];
  user: any;
  dishId = 0;
  ingredients = [];
  options = {} as Options;

  columns = [
    {
      columnDef: 'id',
      header: 'ID.',
      cell: (element: any) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: any) => `${element.name}`,
    },

    {
      columnDef: 'producer',
      header: 'Producer',
      cell: (element: any) => `${element.producer}`,
    },
    {
      columnDef: 'icon',
      header: 'Action',
      cell: (element: any) => `${element.icon}`,
    },
  ];
  filteredOptions: Observable<Menu[]> | undefined;
  displayedColumns: string[] = [];
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private aRoute: ActivatedRoute,
    public cmnService: CmnServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuId = Number(this.aRoute.snapshot.params['menuId']);
    this.dishId = this.aRoute.snapshot.params['dishId'];
    this.ratingId = this.aRoute.snapshot.params['ratingId'];
    this.date = new Date(this.aRoute.snapshot.params['createdAt']);
    this.image = environment.imagePath + this.aRoute.snapshot.params['image'];
    this.user = this.authService.currentUserValue;

    if (this.menuId == 0) {
      this.displayedColumns = this.columns.map((m) => m?.columnDef);
    } else {
      this.displayedColumns = ['id', 'name'];
    }
    console.log('Display column', this.displayedColumns);

    this.getMenu();
    if (this.menuId) {
      this.getDishDetails();
    }

    this.dishName.valueChanges.subscribe((res: string) => {
      this.dishNameValue = res;
    });

    this.filteredOptions = this.dishName.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.menus.slice();
      })
    );
  }

  getMenu() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl +
          'BusinessMenus/getMenuItems?businessProfileId=' +
          this.user.BusinessProfileId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.menus = res?.data;
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  onOptionSelected(e: any) {
    console.log(e);
    this.selectedMenuId = e?.option?.value?.menuId;
    if (e?.option?.value?.selectedIngredients.length > 0) {
      this.showSelectIngredients = false;

      this.ingredients = e?.option?.value?.selectedIngredients.map(
        (ing: any) => {
          return {
            id: ing?.ingredientId,
            name: ing?.ingredientName,
            IngredientId: ing?.ingredientId,
            Producer: ing?.producer,
            selectedValue: ing?.producer ? ing?.producer?.name : '',
          };
        }
      );
    } else {
      this.showSelectIngredients = true;
      this.ingredients = [];
    }
  }
  onValueChange(value: string) {}

  getDishDetails() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl +
          'collectible/getConfirmedDishDetail?collectibleId=' +
          this.dishId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.dishNameValue = res?.data?.dishname;
            this.ratingObj = this.cmnService.getRatingFromId(this.ratingId);
            this.ingredients = res?.data?.ingredients
              ? res?.data?.ingredients.map((ing: any) => {
                  return {
                    id: ing?.ingredientId,
                    name: ing?.ingredientName,
                    IngredientId: ing?.ingredientId,
                    Producer: ing?.producer,
                  };
                })
              : [];
            console.log(this.ingredients, 'Testing');
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
  onFlagClick() {
    const dialogRef = this.dialog.open(ReportDishComponent, {
      width: '500px',
      disableClose: false,
      data: this.dishId,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getDishDetails();
      }
    });
  }

  onSaveDishClick() {
    if (!this.dishName.value) {
      this.cmnService.showWarning('Please Enter Dish Name.');
      return;
    }

    if (!this.ingredients.length) {
      this.cmnService.showWarning('Please select at least one ingredient');
      return;
    }

    let ingredients = this.ingredients.map((ing: any) => {
      return {
        IngredientId: ing.id.toString(),
        Producer: ing.Producer ? ing.Producer : { PlaceId: '' },
      };
    });
    const data = {
      Dishname: this.dishName?.value?.dishName
        ? this.dishName.value?.dishName
        : this.dishName?.value,
      BusinessId: this.user.BusinessProfileId,
      Ingredients: ingredients,
      CollectibleID: this.dishId,
      MenuId: this.selectedMenuId ? this.selectedMenuId : 0,
    };

    this.cmnService.showLoader();
    this.http
      .post(environment.apiUrl + 'collectible/confirmCollectibleDish', data)
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.cmnService.showSuccess('Dish saved successfully.');
            this.router.navigateByUrl('business/dishes');
          } else {
            this.cmnService.showWarning(res?.message);
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  onSelectIngredient() {
    const dialogRef = this.dialog.open(SelectIngredientComponent, {
      width: '95%',
      height: '95%',
      panelClass: 'select-ingredient',
      disableClose: false,
      data: this.ingredients,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res?.length) {
        this.ingredients = res;
      }
    });
  }

  handleProducerChange(address: any, row: any) {
    // let isInTypes = address.types?.some((element: any) => {
    //   return validTypes.includes(element);
    // });

    // if (isInTypes) {
    //   this.cmnService.showWarning('This can not be added as producer.');
    //   return;
    // }
    if (address) {
      console.log(address);
      let isInTypes = address?.types?.some((element: any) => {
        return this.validTypes.includes(element);
      });

      console.log('Address is in types :=', isInTypes);

      if (isInTypes) {
        row.Producer = {
          PlaceId: address.place_id,
          Establishment: address.name,
          Location: address.formatted_address,
          City: '',
          Country: '',
          CountryCode: '',
        };
      } else {
        this.cmnService.showWarning('Can not add this as producer. ');
        row.selectedValue = null;
      }
    }
  }

  onRemoveClick(row: any) {
    this.ingredients = this.ingredients.filter(
      (filter: any) => filter.id !== row.id
    );
  }

  goBack() {
    this.router.navigateByUrl('business/dishes');
  }

  displayFn(menu: Menu): string {
    return menu && menu.dishName ? menu.dishName : '';
  }

  private _filter(name: string): Menu[] {
    const filterValue = name.toLowerCase();

    return this.menus.filter((option: Menu) =>
      option?.dishName?.toLowerCase().includes(filterValue)
    );
  }
}
