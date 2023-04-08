import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    public cmnService: CmnServiceService
  ) {}

  ngOnInit(): void {}

  backToLoginClick() {
    this.router.navigateByUrl('login');
  }

  onSendClick() {
    if (!this.email.trim()) {
      this.cmnService.showWarning('Please enter valid email.');
      return;
    }
    const data = {
      Email: this.email,
    };
  }
}
