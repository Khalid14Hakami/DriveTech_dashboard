import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['name', 'role', 'status'];
  dataSource = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cmnService: CmnServiceService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.cmnService.showLoader();
    this.apiService.getUserData().subscribe((res: any[]) => {
      this.dataSource = res;
      this.cmnService.hideLoader();
    });

    setTimeout(() => {
      this.cmnService.hideLoader();
    }, 3000);
  }
  createNewUser() {
    this.router.navigate(['admin/create-user']);
  }
}
