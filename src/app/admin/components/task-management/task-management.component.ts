import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
})
export class TaskManagementComponent implements OnInit {
  displayedColumns = ['name', 'type', 'repetition'];
  dataSource = new Array();
  routineSourse = new Array();
  routineColums = ['name', 'model'];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getRoutines();
  }

  onCreateNewTask() {
    console.log('create new task');
    this.router.navigate(['admin/create-task']);
  }

  getTasks() {
    this.apiService.getTaskData().subscribe((res) => {
      this.dataSource = res.Response;
      // console.log(this.dataSource, 'data source');
    });
  }

  getRoutines() {
    this.apiService.getRoutinData().subscribe((res) => {
      this.routineSourse = res.Response;
      // console.log(this.routineSourse, 'routineSourse');
    });
  }
}
