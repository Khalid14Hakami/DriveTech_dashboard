import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-new-storage',
  templateUrl: './create-new-storage.component.html',
  styleUrls: ['./create-new-storage.component.scss'],
})
export class CreateNewStorageComponent implements OnInit {
  myForm: FormGroup;
  id: string;
  isEdit = false;
  editId: any;
  nameControl: AbstractControl;
  proponentControl: AbstractControl;
  contactControl: AbstractControl;
  capacityControl: AbstractControl;
  locationControl: AbstractControl;

  constructor(
    private apiService: ApiService,
    private cmnService: CmnServiceService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.params?.id;
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      proponent: new FormControl(null, [Validators.required]),
      contact: new FormControl(null, [
        Validators.required,
        // Validators.pattern(/^\d{10}$/),
      ]),
      capacity: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
    });
    this.nameControl = this.myForm.get('name');
    this.proponentControl = this.myForm.get('proponent');
    this.contactControl = this.myForm.get('contact');
    this.capacityControl = this.myForm.get('capacity');
    this.locationControl = this.myForm.get('location');
    if (this.id) {
      this.isEdit = true;
      this.cmnService.showLoader();
      this.apiService.getStorageDetailById(this.id).subscribe(
        (res) => {
          console.log(res);
          this.cmnService.hideLoader();
          // this.nameControl.setValue(res[this.editId].name);
          // this.proponentControl.setValue(res[this.editId].proponent);
          // this.contactControl.setValue(res[this.editId].contact);
          // this.capacityControl.setValue(res[this.editId].capacity);
          // this.locationControl.setValue(res[this.editId].location);
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
    } else {
      this.isEdit = false;
    }
  }

  onCreateStorage() {
    this.cmnService.showLoader();
    if (this.myForm.valid) {
      if (this.isEdit == true) {
        let data = {
          ...{ strg_id: this.id },
          ...this.myForm.value,
        };
        this.apiService.editStorage(data, this.id).subscribe((res) => {
          this.cmnService.hideLoader();
          this.myForm.reset();
          this.toastr.success('Storage data saved successfully');
        }),
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
          };
      } else {
        let data = {
          location: this.myForm.value?.location,
          name: this.myForm.value?.name,
          proponent: this.myForm?.value?.proponent,
          contact: this.myForm?.value?.contact,
          capacity: this.myForm?.value?.capacity,
        };

        this.apiService.createStorage(data).subscribe((res: any) => {
          this.myForm.reset();
          this.cmnService.hideLoader();
          this.toastr.success('Storage data saved successfully');
        }),
          (err: any) => {
            this.cmnService.hideLoader();
            this.toastr.error(err);
            console.log('err', err);
          };
      }

      // let postData = {
      //   name: this.myForm.get('name').value,
      //   proponent: this.myForm.get('proponent').value,
      //   contact: this.myForm.get('contact').value,
      //   capacity: this.myForm.get('capacity').value,
      //   location: this.myForm.get('location').value,
      //   address2: this.myForm.get('address2').value,
      //   country: this.myForm.get('country').value,
      //   city: this.myForm.get('city').value,
      // };

      // this.apiService.createStorage(postData).subscribe(
      //   (res: any) => {
      //     alert('Your data was saved.');
      //     this.myForm.reset();
      //     this.cmnService.hideLoader();
      //   },
      //   (err) => {
      //     this.cmnService.hideLoader();
      //   }
      // );
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
