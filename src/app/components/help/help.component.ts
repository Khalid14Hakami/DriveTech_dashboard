import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingBubbles } from 'src/app/common/common.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  type = '';
  ratingBubbles: {
    sequenceNo: number;
    colorCode: string;
    isSelected: boolean;
    value: string;
  }[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogType: any) {}

  ngOnInit(): void {
    this.type = this.dialogType;
    this.ratingBubbles = RatingBubbles;
    console.log(this.dialogType);
  }
}
