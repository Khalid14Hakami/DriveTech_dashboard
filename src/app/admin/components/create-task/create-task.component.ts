import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  dataSource = new Array();
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.numEntered();
  }
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    repetition: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    num_of_attrib: new FormControl('', Validators.required),
    Picture: new FormControl('', Validators.required),
  });

  // renderForm(): boolean {
  //   return (
  //     Object.keys(this.taskForm.controls).length === this.dataSource.length
  //   );
  // }

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
            this.dataSource.push(i);
          }
        }
      });
  }

  nameControl = this.taskForm.get('name');
  repetitionControl = this.taskForm.get('repetition');
  typeControl = this.taskForm.get('type');
  num_of_attribControl = this.taskForm.get('num_of_attrib');
  PictureControl = this.taskForm.get('Picture');

  onSubmit() {
    console.log('value of form', this.taskForm.value);
    // this.taskForm.reset();
  }
}
