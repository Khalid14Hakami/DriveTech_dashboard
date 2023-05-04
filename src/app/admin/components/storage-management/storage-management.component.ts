import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewStorageComponent } from '../create-new-storage/create-new-storage.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';
import { ToastrService } from 'ngx-toastr';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

export interface PeriodicElement {
  name: string;
  strg_id: number;
  contact: string;
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
  displayedColumns: string[] = [
    'name',
    'location',
    'strg_id',
    'contact',
    'proponet',
    'action',
  ];
  dataSource = [...ELEMENT_DATA];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cmnService: CmnServiceService
  ) {}

  ngOnInit(): void {
    this.storageData();
  }

  storageData() {
    this.cmnService.showLoader();
    this.apiService.getStorageData().subscribe(
      (res: any) => {
        this.dataSource = res;
        this.cmnService.hideLoader();
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }

  onEditData(data) {
    this.router.navigate(['admin/updateStorage/' + data?.strg_id], {
      queryParams: data,
    });
  }

  onRemoveStorage(data) {
    console.log(data);
    if (confirm('Are you sure?')) {
      this.cmnService.showLoader();
      this.apiService.deleteStorage(data?.strg_id).subscribe(
        (res) => {
          this.toastr.success('Storage data deleted successfully');
          this.storageData();
          this.cmnService.hideLoader();
        },
        (err) => {
          this.cmnService.hideLoader();
          console.log(err);
        }
      );
    }
  }

  onCreateStorage() {
    this.router.navigate(['admin/createNewStorage']);
  }

  onStorageDetail(element) {
    this.router.navigate(['admin/storageDetail/' + element?.strg_id], {
      queryParams: element,
    });
  }
}
