import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { HelpComponent } from 'src/app/components/help/help.component';

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

  showHelpDialog(type: string) {
    this.matDialog.open(HelpComponent, {
      data: type,
    });
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  getRatingFromId(id: any) {
    return CmnServiceService.ratingBubbles.find(
      (rating: any) => rating?.value == id
    );
  }

  public static get ratingBubbles(): any[] {
    return [
      {
        sequenceNo: 1,
        colorCode: '#A1A1A1',
        isSelected: false,
        value: '1',
      },
      {
        sequenceNo: 2,
        colorCode: '#FFBF00',
        isSelected: false,
        value: '2',
      },
      {
        sequenceNo: 3,
        colorCode: '#EAF000',
        isSelected: false,
        value: '3',
      },
      {
        sequenceNo: 4,
        colorCode: '#FFFFFF',
        isSelected: false,
        value: '4',
      },
      {
        sequenceNo: 5,
        colorCode: '#16E700',
        isSelected: false,
        value: '5',
      },
      {
        sequenceNo: 6,
        colorCode: '#FF95D1',
        isSelected: false,
        value: '6',
      },
      {
        sequenceNo: 7,
        colorCode: '#FF00AB',
        isSelected: false,
        value: '7',
      },
    ];
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