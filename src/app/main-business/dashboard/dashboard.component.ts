import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserType } from 'src/app/common/common.model';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  dashboardData: any;
  businesses = [];
  verifiedBusinesses = [];
  unVerifiedBusinesses = [];
  backgroundColor = '';
  userType = UserType;
  constructor(
    private http: HttpClient,
    private cmnService: CmnServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    if (this.user.UserTypeId === UserType.BusinessAdmin) {
      this.getDashboardCounts();
    }
    if (this.user?.UserTypeId === UserType.SuperAdmin) {
      this.getAdminCounts();
    }
  }
  getAdminCounts() {
    this.cmnService.showLoader();
    this.http.get(environment.apiUrl + 'BusinessProfile/getAll').subscribe(
      (res: any) => {
        this.cmnService.hideLoader();
        if (res?.success) {
          this.businesses = res?.data;

          this.verifiedBusinesses = this.businesses.filter(
            (b: any) => b?.isVerified
          );
          this.unVerifiedBusinesses = this.businesses.filter(
            (b: any) => !b?.isVerified
          );

          console.log(this.verifiedBusinesses, this.unVerifiedBusinesses);
        }
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }

  onHelpClick() {
    this.cmnService.showHelpDialog('mymano-score');
  }

  onBusinessClick(status: string) {
    this.router.navigateByUrl('admin/businesses/' + status);
  }

  getDashboardCounts() {
    this.cmnService.showLoader();

    this.http
      .get(
        environment.apiUrl +
          'business/dashboard/get?placeId=' +
          this.user?.PlaceId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.backgroundColor = this.cmnService.getRatingFromId(
              Math.floor(res?.data?.myManoScore)
            )?.colorCode;
            this.dashboardData = res?.data;
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  redirectToDishes() {
    this.router.navigateByUrl('business/dishes');
  }
}
