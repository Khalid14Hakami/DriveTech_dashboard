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
  displayedColumns = ['username', 'email', 'strg_id', 'status', 'action'];
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
    this.apiService.getUserData().subscribe(
      (res: any[]) => {
        console.log('user :-', res);
        this.dataSource = res;
        this.cmnService.hideLoader();
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );

    setTimeout(() => {
      this.cmnService.hideLoader();
    }, 3000);
  }
  createNewUser() {
    this.router.navigate(['admin/create-user']);
  }

  onEditData(data) {
    this.router.navigate(['admin/update-user'], { queryParams: data });
  }

  onDeleteUser(data) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.cmnService.showLoader();
    this.apiService.deleteUser(data?.user_id).subscribe(
      (res: any) => {
        this.cmnService.hideLoader();
        this.cmnService.showSuccess('User Deleted Successfully.');
        this.getUserData();
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }
}
