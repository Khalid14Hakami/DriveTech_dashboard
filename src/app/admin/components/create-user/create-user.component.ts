import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  dataSource = new Array();
  constructor(
    private apiService: ApiService,
    private cmnService: CmnServiceService
  ) {}

  ngOnInit(): void {}

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  userData = {
    name: this.userForm.get('name').value,
    email: this.userForm.get('email').value,
    phone: this.userForm.get('phone').value,
    role: this.userForm.get('role').value,
    branch: this.userForm.get('branch').value,
    status: this.userForm.get('status').value,
  };

  nameControl = this.userForm.get('name');
  emailControl = this.userForm.get('email');
  phoneControl = this.userForm.get('phone');
  roleControl = this.userForm.get('role');
  branchControl = this.userForm.get('branch');
  statusControl = this.userForm.get('status');

  onSubmitUser() {
    this.cmnService.showLoader();
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.apiService.createUser(this.userData).subscribe((res) => {
        alert('User data saved successfully');
        this.userForm.reset();
        this.cmnService.hideLoader();
      }),
        (err) => {
          this.cmnService.hideLoader();
          console.log('err', err);
        };
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
