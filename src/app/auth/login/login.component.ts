import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

export enum UserType {
  'User' = 1,
  'SuperAdmin' = 2,
  'BusinessAdmin' = 3,
  'Chef' = 4,
  'ProducerAdmin' = 5,
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  showPassword = false;
  showLoader = false;
  password: string = '';
  constructor(
    private router: Router,

    private cmnService: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {}
  onForgotPasswordClick() {
    this.router.navigateByUrl('forgot-password');
  }

  onLoginClick() {
    const data = {
      email: this.email,
      password: this.password,
    };
    this.cmnService.showLoader();

    this.showLoader = true;

    this.authService.login(data).subscribe(
      (res: any) => {
        this.showLoader = false;

        this.router.navigateByUrl('admin');

        this.cmnService.hideLoader();
      },
      (err) => {
        this.showLoader = false;
        this.cmnService.hideLoader();
      }
    );
  }
}
