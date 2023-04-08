import { Component, OnInit } from '@angular/core';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
})
export class PreLoginComponent implements OnInit {
  theme = 'light';
  constructor(
    public cmnService: CmnServiceService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.getStorageList();
  }

  getStorageList() {
    this.apiService.getStorageList().subscribe((res: any) => {
      console.log('Storage List', res);
    });
  }
}
