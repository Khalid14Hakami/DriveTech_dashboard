import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
})
export class TaskManagementComponent implements OnInit {
  displayedColumns = ['name', 'type', 'repetition', 'action'];
  routineColums = ['name', 'model', 'action'];
  taskData = [];
  routinesData = [];
  routineData: Object;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cmnService: CmnServiceService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.getRoutines();
  }

  onCreateNewTask() {
    this.router.navigate(['admin/create-task']);
  }
  onCreateNewRoutine() {
    this.router.navigate(['admin/create-routine']);
  }
  getTasks() {
    this.cmnService.showLoader();
    this.apiService.getTaskData().subscribe((res: any) => {
      this.taskData = res;

      this.cmnService.hideLoader();
    });
    setTimeout(() => {
      this.cmnService.hideLoader();
    }, 1000);
  }

  onEditTask(data) {
    this.router.navigate(['admin/update-task/' + data?.task_id], {
      queryParams: data,
    });
  }
  onRemoveTask(data) {
    if (confirm('Are you sure?')) {
      this.cmnService.showLoader();
      this.apiService.removeTaskData(data?.task_id).subscribe(
        (res) => {
          this.cmnService.hideLoader();
          this.getTasks();
          this.toastr.success('Task deleted successfully');
        },
        (err) => {
          this.cmnService.hideLoader();
          console.log(err);
        }
      );
    }
  }

  getRoutines() {
    this.cmnService.showLoader();
    this.apiService.getRoutinesData().subscribe((res: any) => {
      this.routinesData = res;
      this.cmnService.hideLoader();
    });
  }
  onEditRoutine(data) {
    this.router.navigate(['admin/update-routine/' + data?.rtn_id], {
      queryParams: data,
    });
  }
  showRoutineDetail(data) {
    this.cmnService.showLoader();
    this.apiService.getRoutineData(data?.rtn_id).subscribe((res) => {
      this.routineData = res;
      this.cmnService.hideLoader();
    });
  }
  onRemoveRoutine(data) {
    if (confirm('Are you sure?')) {
      this.cmnService.showLoader();
      this.apiService.removeRoutinData(data?.rtn_id).subscribe(
        (res) => {
          this.toastr.success('Routinedata deleted successfully');
          this.getRoutines();
          this.cmnService.hideLoader();
        },
        (err) => {
          this.cmnService.hideLoader();
          console.log(err);
        }
      );
    }
  }
}
