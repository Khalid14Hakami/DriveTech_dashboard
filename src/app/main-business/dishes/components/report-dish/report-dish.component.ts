import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-dish',
  templateUrl: './report-dish.component.html',
  styleUrls: ['./report-dish.component.scss'],
})
export class ReportDishComponent implements OnInit {
  reportReason!: string;
  user: any;
  comment = '';
  reasons = [
    { id: 1, name: 'Not our dish' },
    { id: 2, name: 'Scam or Fraud' },
    { id: 3, name: 'Image is not clear' },
    { id: 4, name: 'Other' },
  ];
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private cmnService: CmnServiceService,
    @Inject(MAT_DIALOG_DATA) public dishId: any,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  onCloseClick() {
    this.dialog.closeAll();
  }

  onReportClick() {
    const data = {
      loggedUserId: this.user.UserId,
      collectibleId: this.dishId,
      reason: this.reportReason,
      comment: this.comment,
      status: '1',
    };

    this.cmnService.showLoader();

    this.http
      .post(environment.apiUrl + 'collectible/reportCollectibles', data)
      .subscribe(
        (res: any) => {
          if (res?.success) {
            this.cmnService.hideLoader();
            this.dialog.closeAll();
          } else {
            this.cmnService.showError(res?.message);
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
}
