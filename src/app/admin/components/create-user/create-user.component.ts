import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  dataSource = [];
  userForm: FormGroup;
  nameControl: any;
  emailControl: any;
  phoneControl: any;
  roleControl: any;
  branchControl: any;
  storages = [];
  userDetail: any;
  statusControl: any;
  passwordControl: any;
  constructor(
    private apiService: ApiService,
    private cmnService: CmnServiceService,
    private aRoute: ActivatedRoute,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      strg_id: new FormControl(null, Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.nameControl = this.userForm.get('username');
    this.emailControl = this.userForm.get('email');
    this.phoneControl = this.userForm.get('phone');
    this.passwordControl = this.userForm.get('password');
    this.roleControl = this.userForm.get('role');
    this.branchControl = this.userForm.get('strg_id');
    this.statusControl = this.userForm.get('status');

    this.aRoute.queryParams.subscribe((res: any) => {
      console.log('res ;', res);
      this.userDetail = res;
      this.nameControl.setValue(res?.username);
      this.emailControl.setValue(res?.email);
      this.phoneControl.setValue(res?.phone);
      this.statusControl.setValue(res?.status);
    });

    this.apiService.getStorageData().subscribe(
      (storages: any) => {
        console.log(storages);
        this.storages = storages;

        this.branchControl?.setValue(Number(this.userDetail?.strg_id));
        this.branchControl.updateValueAndValidity();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmitUser() {
    this.cmnService.showLoader();
    if (this.userForm.valid) {
      this.apiService.createUser(this.userForm.value).subscribe((res) => {
        this.toster.success('User data saved successfully');
        this.userForm.reset();
        this.cmnService.hideLoader();
      }),
        (err) => {
          this.cmnService.hideLoader();
          console.log('err', err);
        };
    } else {
      this.toster.warning('Please fill in all required fields before saving.');
    }
  }
}
