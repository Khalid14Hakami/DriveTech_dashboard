import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
})
export class CreateRoutineComponent implements OnInit {
  isEdit = false;

  routineForm: FormGroup;
  nameControl: any;
  routine_idControl: any;
  modelControl: any;
  tasksControl: any;
  tasks = [];
  id: string;
  constructor(
    private cmnService: CmnServiceService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    // this.id = this.aRoute.snapshot.queryParams?.id;
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.routineForm = new FormGroup({
      name: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      tasks: new FormControl('', Validators.required),
    });

    this.apiService.getTaskData().subscribe((tasks: any) => {
      this.tasks = tasks;
    });

    this.nameControl = this.routineForm.get('name');

    this.modelControl = this.routineForm.get('model');
    this.tasksControl = this.routineForm.get('tasks');

    this.aRoute.queryParams.subscribe((res: any) => {
      if (res?.rtn_id) {
        this.isEdit = true;
        this.id = res?.rtn_id;
        console.log('routines:- ', res);
        this.nameControl.setValue(res?.name);
        this.modelControl.setValue(res?.model);
        this.tasksControl.setValue(res?.tasks);
      } else {
        this.isEdit = false;
      }
    });
  }

  onSubmitRoutine() {
    this.cmnService.showLoader();
    if (this.routineForm.valid) {
      if (this.id) {
        this.apiService
          .editRoutinData(this.routineForm.value, this.id)
          .subscribe(
            (res: any) => {
              this.cmnService.hideLoader();
              this.toastr.success('Routine updated successfully');
              this.isEdit = false;
            },
            (err: any) => {
              this.cmnService.hideLoader();
              this.toastr.error(err);
              console.log('err', err);
              this.isEdit = false;
            }
          );

        this.routineForm.reset();
      } else {
        console.log('routine :-', this.routineForm.value);
        this.apiService.createRoutine(this.routineForm.value).subscribe(
          (res: any) => {
            this.cmnService.hideLoader();
            this.toastr.success('Routine saved successfully');
            this.routineForm.reset();
          },
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
          }
        );
      }
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
