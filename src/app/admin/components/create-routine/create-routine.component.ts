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
  id: string;
  constructor(
    private cmnService: CmnServiceService,
    private apiService: ApiService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.queryParams?.id;
  }

  ngOnInit(): void {
    this.routineForm = new FormGroup({
      name: new FormControl('', Validators.required),
      rtn_id: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      tasks: new FormControl('', Validators.required),
    });

    this.nameControl = this.routineForm.get('name');
    this.routine_idControl = this.routineForm.get('rtn_id');
    this.modelControl = this.routineForm.get('model');
    this.tasksControl = this.routineForm.get('tasks');

    if (this.id) {
      this.isEdit = true;

      // this.apiService.getRoutinesData().subscribe((res) => {
      //   this.nameControl.setValue(res[this.editId].name);
      //   this.routine_idControl.setValue(res[this.editId].rtn_id);
      //   this.modelControl.setValue(res[this.editId].model);
      //   this.tasksControl.setValue(res[this.editId].tasks);
      // });
    } else {
      this.isEdit = false;
    }

    if (this.isEdit == true) {
    }
  }

  onSubmitRoutine() {
    this.cmnService.showLoader();
    if (this.routineForm.valid) {
      if ((this.isEdit = true)) {
        this.apiService
          .editRoutinData(this.routineForm.value, this.id)
          .subscribe((res: any) => {
            this.cmnService.hideLoader();
            this.toastr.success('Taskdata updated successfully');
            this.isEdit = false;
          }),
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
            this.isEdit = false;
          };
        this.routineForm.reset();
      } else {
        this.apiService
          .createRoutine(this.routineForm.value)
          .subscribe((res: any) => {
            this.cmnService.hideLoader();
            this.toastr.success('Taskdata saved successfully');
          }),
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
          };
        this.routineForm.reset();
      }
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
