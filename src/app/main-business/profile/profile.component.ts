import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  businessEmail = '';
  adminName = '';
  telephone = null;
  chefName = '';
  chefEmail = '';
  chefTelephone = '';
  chefId = null;
  startDate: Date = new Date();
  showUpdateBusinessProfileLoader = false;
  showUpdateChefDetailsLoader = false;
  user: any;
  constructor(
    private http: HttpClient,
    public cmnService: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    this.getProfile();
    this.getChefDetail();
  }

  getProfile() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl +
          'Account/getBusinessProfile?userID=' +
          this.user?.UserId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();

          this.adminName = res?.data?.adminName;
          this.businessEmail = res?.data?.emailAddress;
          this.telephone = res?.data?.phoneNumber;
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  getChefDetail() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl +
          'Account/getChefDetails?businessProfileId=' +
          this.user?.BusinessProfileId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.chefName = res.data?.chefName;
            this.chefEmail = res.data?.email;
            this.chefTelephone = res?.data.phonenumber;
            this.startDate = res?.data?.startDate;
            this.chefId = res?.data?.chefId ? res?.data?.chefId : 0;
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  updateChefDetails() {
    let data = {
      chefName: this.chefName,
      email: this.chefEmail,
      phonenumber: this.chefTelephone,
      businessProfileId: this.user?.BusinessProfileId,
      startDate: this.startDate,
      chefId: this.chefId ? this.chefId : 0,
    };
    this.cmnService.showLoader();

    this.http
      .post(environment.apiUrl + 'Account/updateChefDetails', data)
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.cmnService.showSuccess(res?.message);
            this.getChefDetail();
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  updateBusinessProfile() {
    const data = {
      userID: this.user?.UserId,
      adminName: this.adminName,
      phoneNumber: this.telephone,
    };
    this.cmnService.showLoader();
    this.http
      .post(environment.apiUrl + 'Account/updateBusinessProfile', data)
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.cmnService.showSuccess(res?.message);
            this.getProfile();
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
}
