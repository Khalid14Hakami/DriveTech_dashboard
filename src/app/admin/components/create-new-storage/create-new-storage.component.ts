import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-create-new-storage',
  templateUrl: './create-new-storage.component.html',
  styleUrls: ['./create-new-storage.component.scss'],
})
export class CreateNewStorageComponent implements OnInit {
  selectedCity = 'All';
  selectedCountry = 'All';
  constructor(private apiService: ApiService) {
    this.myForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      proponent: new FormControl(null, [Validators.required]),
      mobileNumber: new FormControl(null, [
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

  ngOnInit(): void {}

  get form() {
    return this.myForm.controls;
  }

  onSave() {
    // check if the form is valid
    if (this.myForm.valid) {
      // log the form values to the console
      console.log(this.myForm.value);
      let postData = {
        name: this.myForm.get('name').value,
        proponent: this.myForm.get('proponent').value,
        mobileNumber: this.myForm.get('mobileNumber').value,
        capacity: this.myForm.get('capacity').value,
        address1: this.myForm.get('address1').value,
        address2: this.myForm.get('address2').value,
        country: this.myForm.get('country').value,
        city: this.myForm.get('city').value,
      };

      // show an alert to inform the user that the data was saved
      alert('Your data was saved.');

      // reset the form to clear the values
      this.myForm.reset();
    } else {
      // show an alert to inform the user that the data is incomplete
      alert('Please fill in all required fields before saving.');
    }
  }
  // storData(postData: any): Observable<any> {
  // return this.apiService.storageData('', postData);
  // }
}
