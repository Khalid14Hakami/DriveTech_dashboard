import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewStorageComponent } from '../create-new-storage/create-new-storage.component';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';

export interface PeriodicElement {
  name: string;
  stored: number;
  available: number;
  location: string;
  proponet: string;
}

let storageData = new Array();

const ELEMENT_DATA = [];
@Component({
  selector: 'app-storage-management',
  templateUrl: './storage-management.component.html',
  styleUrls: ['./storage-management.component.scss'],
})
export class StorageManagementComponent implements OnInit {
  table: any;
  PeriodicElement: any;
  storageData: any;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  displayedColumns: string[] = [
    'name',
    'location',
    'stored',
    'available',
    'proponet',
    'action',
  ];
  dataSource = [...ELEMENT_DATA];

  onEditData(index: number) {
    console.log('Edit element:', index);
    this.router.navigate(['admin/createNewStorage']);
  }

  onRemoveData(index: any) {
    // TODO: implement delete logic
    console.log('Delete element:', index);

    if (confirm('Are you sure?')) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  onCreateStorage() {
    this.router.navigate(['admin/createNewStorage']);
  }

  getData() {
    this.apiService.getData().subscribe((res: any) => {
      this.dataSource = res;
      console.log('Get Data', res);
    });
  }
}
