import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingBubbles } from 'src/app/common/common.model';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

export interface Dish {
  name: string;
  collectibleImageLocation: string;
  createdAt: string;
  menuId: number;
  rating: number;
  categoryName: string;
  ratingObj?: {
    colorCode: string;
    isSelected: boolean;
    sequenceNo: number;
    value: string;
  };
}

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  user: any;
  search = '';
  selectedStatus = 'all';
  imagePath = environment.imagePath;
  dishes: Dish[] = [];
  dishesCopy: Dish[] = [];
  ratingBubbles: {
    sequenceNo: number;
    colorCode: string;
    isSelected: boolean;
    value: string;
  }[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private cmnService: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getDishes();
    this.ratingBubbles = RatingBubbles;
  }

  getDishes() {
    this.cmnService.showLoader();

    this.http
      .get(
        environment.apiUrl +
          'collectible/getAllCollectiblesDishesBasedOnBusinessProfileId?businessProfileId=' +
          this.user.BusinessProfileId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.dishes = res?.data;
            this.dishes.forEach((dish: any) => {
              dish.ratingObj = this.cmnService.getRatingFromId(dish?.rating);
            });

            this.dishesCopy = res?.data;
            this.dishesCopy.forEach((dish: any) => {
              dish.ratingObj = this.cmnService.getRatingFromId(dish?.rating);
            });

            console.log(this.dishesCopy);
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  onSearch(searchStr: string) {
    if (searchStr.trim().length > 0) {
      if (this.selectedStatus == 'confirmed') {
        this.dishes = this.dishes.filter((dish: Dish) => {
          return (
            dish.categoryName
              .toLocaleLowerCase()
              .includes(searchStr.trim().toLocaleLowerCase()) && dish.menuId
          );
        });
      } else if (this.selectedStatus == 'unconfirmed') {
        this.dishes = this.dishes.filter((dish: Dish) => {
          return (
            dish.categoryName
              .toLocaleLowerCase()
              .includes(searchStr.trim().toLocaleLowerCase()) && !dish.menuId
          );
        });
      } else {
        this.dishes = this.dishes.filter((dish: Dish) => {
          return dish.categoryName
            .toLocaleLowerCase()
            .includes(searchStr.trim().toLocaleLowerCase());
        });
      }
    } else {
      this.dishes = this.dishesCopy;
    }
  }

  onStatusChange(e: any) {
    console.log(e);
    this.dishes = this.dishesCopy;
    if (this.search) {
      this.selectedStatus = e;
      this.onSearch(this.search);
    } else {
      if (e == 'all') {
        this.dishes = this.dishesCopy;
      } else {
        if (e == 'confirmed') {
          this.dishes = this.dishes.filter((dish: Dish) => {
            return dish.menuId != 0;
          });
        } else {
          this.dishes = this.dishes.filter((dish: Dish) => {
            return dish.menuId == 0;
          });
        }
      }
    }
  }

  onDishClick(dishDetail: any) {
    this.router.navigateByUrl(
      'business/dish-detail/' +
        dishDetail?.menuId +
        '/' +
        dishDetail?.collectibleId +
        '/' +
        dishDetail.createdAt +
        '/' +
        dishDetail.collectibleImageLocation +
        '/' +
        dishDetail?.rating
    );
  }
}
