import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-business',
  templateUrl: './verify-business.component.html',
  styleUrls: ['./verify-business.component.scss'],
})
export class VerifyBusinessComponent implements OnInit {
  email = '';

  user: any;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    public cmnService: CmnServiceService,
    public dialogRef: MatDialogRef<VerifyBusinessComponent>,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public menuData: any
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  sendEmail() {
    if (!this.email.trim()) {
      this.cmnService.showWarning('Please enter email.');
      return;
    }
    const data = {
      businessProfileID: this.menuData?.id,
      emailID: this.email,
    };
    this.cmnService.showLoader();
    this.http
      .post(environment.apiUrl + 'Account/verifyBusiness', data)
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.cmnService.showSuccess(res.message);
            this.dialogRef.close('verified');
          } else {
            this.cmnService.showWarning(res?.message);
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
}
