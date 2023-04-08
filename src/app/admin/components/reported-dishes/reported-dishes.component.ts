import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reported-dishes',
  templateUrl: './reported-dishes.component.html',
  styleUrls: ['./reported-dishes.component.scss'],
})
export class ReportedDishesComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'restaurant', 'reason'];
  search = '';
  user: any;
  reportedDishes!: MatTableDataSource<any>;
  constructor(
    private http: HttpClient,
    public cmnService: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService?.currentUserValue;
    this.getReportedDishes();
  }
  onSearch(searchStr: string) {
    this.reportedDishes.filter = searchStr.trim().toLowerCase();
  }
  getReportedDishes() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl +
          'collectible/getAllReportCollectibles?loggedUserId=' +
          this.user?.UserId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.reportedDishes = new MatTableDataSource(res?.data);
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
}
