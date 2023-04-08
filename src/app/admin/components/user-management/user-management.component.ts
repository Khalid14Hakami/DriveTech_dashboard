import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['name', 'role', 'status'];
  dataSource = new Array();

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.apiService.getUserData().subscribe((res) => {
      this.dataSource = res;
      console.log(this.dataSource, 'user data');
    });
  }
  createNewUser() {
    this.router.navigate(['admin/create-user']);
  }
}
