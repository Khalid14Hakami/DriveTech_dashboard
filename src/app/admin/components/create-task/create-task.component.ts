import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  dataSource = new Array();
  // userFormData = new Object()

  constructor(
    private apiService: ApiService,
    private cmnService: CmnServiceService
  ) {}

  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    repetition: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    num_of_attrib: new FormControl('', Validators.required),
    Picture: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}

  userFormData = {
    name: this.taskForm.get('name').value,
    repetition: this.taskForm.get('repetition').value,
    type: this.taskForm.get('type'),
    num_of_attrib: this.taskForm.get('num_of_attrib').value,
    Picture: this.taskForm.get('Picture').value,
  };

  ngAfterViewInit() {
    this.numEntered();
  }

  numEntered() {
    this.taskForm
      .get('num_of_attrib')
      ?.valueChanges.subscribe((res: number) => {
        this.dataSource = new Array();
        if (res > 0) {
          for (let i = 1; i <= res; i++) {
            this.taskForm.addControl(
              `num_of_attrib${i}`,
              new FormControl('', Validators.required)
            );
            this.dataSource.push(i),
              (this.userFormData[`num_of_attrib${i}`] = this.taskForm.get(
                `num_of_attrib${i}`
              ).value);
          }
        } else {
        }
      });
  }

  nameControl = this.taskForm.get('name');
  repetitionControl = this.taskForm.get('repetition');
  typeControl = this.taskForm.get('type');
  num_of_attribControl = this.taskForm.get('num_of_attrib');
  PictureControl = this.taskForm.get('Picture');

  onSubmit() {
    this.cmnService.showLoader();
    if (this.taskForm.valid) {
      this.apiService.createTask(this.userFormData).subscribe((res: any) => {
        alert('Taskdata saved successfully');
        this.cmnService.hideLoader();
      }),
        (err: any) => {
          this.cmnService.hideLoader();
          console.log('err', err);
        };
      this.taskForm.reset();
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
