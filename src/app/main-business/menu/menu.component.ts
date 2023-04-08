import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

export interface Menu {
  dishName: string;
  category: string;
  ingredients: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  selectedCategory = 'all';
  showUpload = true;
  displayedColumns: string[] = ['dishName', 'category', 'ingredients'];
  dataSource!: MatTableDataSource<Menu>;
  dataSourceCopy: Menu[] = [];
  showMenuUpload = false;
  search = '';
  categories: any[] = [];
  file: any;
  user: any;
  constructor(
    private http: HttpClient,
    public cmnService: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.isMenuUploaded();
    this.getMenuDetails();
  }
  onSearch(searchStr: string) {
    this.dataSource.filter = searchStr.trim().toLowerCase();
  }

  onCategoryChange(category: any) {
    this.dataSource = new MatTableDataSource(this.dataSourceCopy);
    if (category == 'all') {
      this.dataSource = new MatTableDataSource(this.dataSourceCopy);
    } else {
      let dataSource = this.dataSource.data.filter((data: any) => {
        return data?.category == category;
      });
      this.dataSource = new MatTableDataSource(dataSource);
    }
  }
  getMenuDetails() {
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
            let dataSource = res?.data;
            this.categories = [
              ...new Set(dataSource.map((menu: any) => menu.category)),
            ];

            this.categories = this.categories.filter((c) => c);

            dataSource.forEach((menu: any) => {
              if (menu?.selectedIngredients) {
                menu.ingredientsData = menu?.selectedIngredients
                  .map((item: any) => item?.ingredientName)
                  .toString();
              }
            });
            this.dataSourceCopy = dataSource;
            this.dataSource = new MatTableDataSource(dataSource);
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  isMenuUploaded() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl +
          'BusinessProfile/isMenuUploaded?businessProfileId=' +
          this.user?.BusinessProfileId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.showMenuUpload = res?.data;
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  onFileChange(file: any) {
    this.file = file.target.files[0];

    this.uploadFile();
  }

  uploadFile() {
    let formData = new FormData();
    formData.set('MenuFile', this.file);
    formData.set('BusinessProfileId', this.user?.BusinessProfileId);
    this.cmnService.showLoader();
    this.http
      .post(environment.apiUrl + 'BusinessProfile/UploadMenu', formData)
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res.success) {
            this.cmnService.showSuccess(res?.message);
            this.getMenuDetails();
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
}
