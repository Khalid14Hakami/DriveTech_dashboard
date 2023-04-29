import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';

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
  displayedColumns: string[] = ['VIN', 'car_id', 'color', 'arraival_date'];
  dataSource = [...ELEMENT_DATA];

  constructor(private apiService: ApiService, private aRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params.id;
    this.storageDetail();
  }

  storageDetail() {
    this.apiService.getVehiclesOfStorage(this.id).subscribe((res: any) => {
      this.dataSource = res;
    });
  }
}
