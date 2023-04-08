import { Component } from '@angular/core';

import { CmnServiceService } from './service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class AppComponent {
  title = 'drivetech';
  constructor(public cmnService: CmnServiceService) {
    this.cmnService.checkDeviceTypeAndSetValue(window.innerWidth);
  }

  onResize(event: any) {
    this.cmnService.checkDeviceTypeAndSetValue(event.target.innerWidth);
  }
}
