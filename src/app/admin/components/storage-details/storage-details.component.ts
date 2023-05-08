import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

export interface PeriodicElement {
  car_id: number;
  VIN: number;
  color: string;
  arraival_date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.scss'],
})
export class StorageDetailsComponent implements OnInit {
  id: string;
  storage: any;
  displayedColumns: string[] = ['VIN', 'car_id', 'color', 'arraival_date'];
  dataSource = [...ELEMENT_DATA];

  constructor(
    private apiService: ApiService,
    private aRoute: ActivatedRoute,
    private cmnService: CmnServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params.id;
    this.aRoute.queryParams.subscribe(
      (res: any) => {
        console.log(res);
        this.storage = res;
        this.storageDetail();
      },

      (err) => {
        console.log(err);
      }
    );
  }

  storageDetail() {
    this.cmnService.showLoader();
    this.apiService.getVehiclesOfStorage(this.id).subscribe(
      (res: any) => {
        this.dataSource = res;
        this.cmnService.hideLoader();
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }
}
