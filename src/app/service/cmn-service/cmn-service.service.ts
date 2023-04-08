import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmnServiceService {
  loader: BehaviorSubject<any> = new BehaviorSubject(false);
  deviceInfo: BehaviorSubject<string> = new BehaviorSubject('');
  businessDetail: BehaviorSubject<any> = new BehaviorSubject(Object);
  constructor(
    private toastr: ToastrService,
    private locationStrategy: LocationStrategy,
    private matDialog: MatDialog
  ) {}

  showSuccess(msg: string) {
    this.toastr.success('Success', msg);
  }

  showError(msg: string) {
    this.toastr.error('Error', msg);
  }

  showWarning(res: string) {
    this.toastr.warning('Warning', res);
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  decrypt(data: string) {
    if (data) {
      return atob(data);
    }
    return '';
  }

  encrypt(data: string) {
    if (data) {
      return btoa(data);
    }
    return '';
  }

  showLoader() {
    if (!this.loader.value) {
      this.loader.next(true);
    }
  }

  hideLoader() {
    if (this.loader.value) {
      this.loader.next(false);
    }
  }

  checkDeviceTypeAndSetValue(width: number) {
    if (width > 0 && width < 840) {
      this.deviceInfo.next('mobile');
    } else if (width > 840) {
      this.deviceInfo.next('computer');
    }
  }
}
