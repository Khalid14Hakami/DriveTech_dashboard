import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-business',
  templateUrl: './verify-business.component.html',
  styleUrls: ['./verify-business.component.scss'],
})
export class VerifyBusinessComponent implements OnInit {
  businessName = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {
    this.businessName = this.data;
    console.log('ds', this.businessName);
  }
}
