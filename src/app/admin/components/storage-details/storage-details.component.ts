import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api-service/api.service';

export interface PeriodicElement {
  model: string;
  vin: string;
  color: string;
  arrival_date: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.scss'],
})
export class StorageDetailsComponent implements OnInit {
  displayedColumns: string[] = ['vin', 'model', 'color', 'arrival_date'];
  dataSource = [...ELEMENT_DATA];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.storageDetail();
  }

  storageDetail() {
    this.apiService.getStorageDetail().subscribe((res: any) => {
      this.dataSource = res;
      console.log('Get User Detail', res);
    });
  }
}
