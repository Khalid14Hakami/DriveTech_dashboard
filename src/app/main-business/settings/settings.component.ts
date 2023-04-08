import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentPassword = '';
  user: any;
  newPassword = '';
  confirmNewPassword = '';
  constructor(
    public cmnService: CmnServiceService,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  onSave() {
    if (
      !this.currentPassword.trim() ||
      !this.newPassword.trim() ||
      !this.confirmNewPassword
    ) {
      this.cmnService.showWarning('All Fields are mandatory');
      return;
    }

    if (this.newPassword.trim() !== this.confirmNewPassword.trim()) {
      this.cmnService.showWarning('Password does not match');
      return;
    }

    const data = {
      userId: this.user?.UserId,
      oldPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmNewPassword,
    };
    this.cmnService.showLoader();
    this.http
      .post(environment.apiUrl + '/Account/changepassword', data, {
        responseType: 'text',
      })
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          this.cmnService.showSuccess('Password updated successfully.');
          this.newPassword = '';
          this.currentPassword = '';
          this.confirmNewPassword = '';
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }
}
