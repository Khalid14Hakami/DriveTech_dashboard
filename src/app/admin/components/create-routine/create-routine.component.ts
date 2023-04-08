import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.scss'],
})
export class CreateRoutineComponent implements OnInit {
  constructor(
    private cmnService: CmnServiceService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}
  routineForm = new FormGroup({
    name: new FormControl('', Validators.required),
    routine_id: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    tasks: new FormControl('', Validators.required),
  });

  nameControl = this.routineForm.get('name');
  routine_idControl = this.routineForm.get('routine_id');
  modelControl = this.routineForm.get('model');
  tasksControl = this.routineForm.get('tasks');

  onSubmitRoutine() {
    this.cmnService.showLoader();
    if (this.routineForm.valid) {
      this.apiService.createRoutine(this.routineForm).subscribe((res: any) => {
        alert('RoutineData saved successfully');
        this.cmnService.hideLoader();
      }),
        (err: any) => {
          this.cmnService.hideLoader();
          console.log('err', err);
        };
      this.routineForm.reset();
    } else {
      alert('Please fill in all required fields before saving.');
    }
    console.log(this.routineForm.value);
  }
}
