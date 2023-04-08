import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLoader = false;
  businessDetail: any;
  @Output('toggle') buttonToggle = new EventEmitter();

  isOpened = true;

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
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user);
  }

  onLogoutClick() {
    this.authService.logout();
  }

  toggle() {
    this.isOpened = !this.isOpened;
    this.buttonToggle.emit(this.isOpened);
  }
}
