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
@Component({
  selector: 'app-create-new-storage',
  templateUrl: './create-new-storage.component.html',
  styleUrls: ['./create-new-storage.component.scss'],
})
export class CreateNewStorageComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private cmnService: CmnServiceService
  ) {
    this.myForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      proponent: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      capacity: new FormControl(null, [Validators.required]),
      address1: new FormControl(null, [Validators.required]),
      address2: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
    });
  }
  myForm!: FormGroup;

  ngOnInit(): void {
    this.onEditStorage();
  }

  get form() {
    return this.myForm.controls;
  }

  onEditStorage() {
    this.myForm.controls.name.setValue(this.apiService.storageForEdit.name);
    this.myForm.controls.proponent.setValue(
      this.apiService.storageForEdit.proponent
    );
    this.myForm.controls.phone.setValue(this.apiService.storageForEdit.Phone);
    this.myForm.controls.capacity.setValue(
      this.apiService.storageForEdit?.capacity
    );
    this.myForm.controls.address1.setValue(
      this.apiService.storageForEdit.location
    );
    this.myForm.controls.address2.setValue(
      this.apiService.storageForEdit?.address2
    );
    this.myForm.controls.country.setValue(
      this.apiService.storageForEdit?.country
    );
    this.myForm.controls.city.setValue(this.apiService.storageForEdit?.city);
  }

  onCerateStorage() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      let postData = {
        name: this.myForm.get('name').value,
        proponent: this.myForm.get('proponent').value,
        phone: this.myForm.get('phone').value,
        capacity: this.myForm.get('capacity').value,
        address1: this.myForm.get('address1').value,
        address2: this.myForm.get('address2').value,
        country: this.myForm.get('country').value,
        city: this.myForm.get('city').value,
      };

      this.cmnService.showLoader();

      this.apiService.createStorage(postData).subscribe(
        (res: any) => {
          alert('Your data was saved.');
          this.myForm.reset();
          this.cmnService.hideLoader();
        },
        (err) => {
          this.cmnService.hideLoader();
          console.log('err - ', err);
        }
      );
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
}
