import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { VerifyBusinessComponent } from 'src/app/pre-login/verify-business/verify-business.component';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

export enum UserType {
  'User' = 1,
  'SuperAdmin' = 2,
  'BusinessAdmin' = 3,
  'Chef' = 4,
  'ProducerAdmin' = 5,
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLoader = false;
  businessDetail: any;
  @Output('toggle') buttonToggle = new EventEmitter();
  currentRoute = '/search';
  isOpened = true;
  userType = UserType;
  user: any;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cmnService: CmnServiceService,
    private authService: AuthServiceService,
    private cdf: ChangeDetectorRef
  ) {
    this.cmnService.loader.subscribe((loaderValue: boolean) => {
      this.showLoader = loaderValue;
      this.cdf.detectChanges();
    });

    this.cmnService.businessDetail.subscribe((businessDetail: any) => {
      console.log(businessDetail);
      this.businessDetail = businessDetail;
    });
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user);
    this.currentRoute = window.location.pathname;

    this.router.events.subscribe((ev: Event) => {
      if (ev instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = ev.url;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
  }
  onProfileClick() {
    this.router.navigateByUrl('business/profile');
  }

  onSettingsClick() {
    this.router.navigateByUrl('business/settings');
  }

  onLoginClick() {
    this.router.navigateByUrl('login');
  }

  onLogoClick() {
    if (this.user) {
      if (this.user?.UserTypeId == this.userType.BusinessAdmin) {
        this.router.navigateByUrl('business');
      } else if (this.user?.UserTypeId == this.userType.SuperAdmin) {
        this.router.navigateByUrl('admin');
      }
    } else {
      this.router.navigateByUrl('search');
    }
  }

  toggle() {
    this.isOpened = !this.isOpened;
    this.buttonToggle.emit(this.isOpened);
  }

  onSearchClick() {
    this.router.navigateByUrl('search');
  }
  onVerifyBusinessClick() {
    this.dialog.open(VerifyBusinessComponent, {
      width: '750px',
      data: this.businessDetail?.name,
    });
  }
}
