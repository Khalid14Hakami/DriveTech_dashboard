import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';
import { VerifyBusinessComponent } from '../verify-business/verify-business.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  placeId = '';
  details: any;
  name = '';
  address = '';
  placeDetails: any;
  myManoDetails: any;
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  constructor(
    private aRoute: ActivatedRoute,
    private http: HttpClient,
    private cmnService: CmnServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cmnService.preventBackButton();
    this.placeId = this.aRoute.snapshot.params['id'];
    this.details = JSON.parse(
      this.cmnService.decrypt(this.aRoute.snapshot.params['detail'])
    );
    this.name = this.details?.name;
    this.address = this.details?.address;

    if (this.placeId) {
      //  this.getDataFromPlaceId();
      this.getMyManoDetails();
    }
  }

  getMyManoDetails() {
    this.cmnService.showLoader();
    this.http
      .get(
        environment.apiUrl + 'business/dashboard/get?placeId=' + this.placeId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.myManoDetails = res?.data;
            this.cmnService.businessDetail.next({
              name: this.name,
              details: this.myManoDetails,
            });
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

  getDataFromPlaceId() {
    // this.http
    //   .get(environment.googleMapUrl + '&place_id=' + this.placeId)
    //   .subscribe(
    //     (res: any) => {
    //       this.placeDetails = res?.result;
    //     },
    //     (err) => {}
    //   );

    fetch(environment.googleMapUrl + '&place_id=' + this.placeId) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((response: any) => {
        this.placeDetails = response?.result;
      })
      .then((contents) => console.log(contents))
      .catch(() =>
        console.log('Can’t access ' + ' response. Blocked by browser?')
      );
  }
  onVerifyBusinessClick() {
    // console.log("onVerifyBusinessClick",this.myManoDetails);
    this.dialog.open(VerifyBusinessComponent, {
      width: '750px',
      data: this.name,
    });
  }
}
