import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { validTypes } from 'src/app/common/common.model';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  validTypes = validTypes;
  input = '';
  options = {
    // types: [
    //   'bakery',
    //   'bar',
    //   // 'lodging',
    //   'meal_delivery',
    //   'meal_takeaway',
    //   // 'supermarket',
    //   // 'night_club',
    //   'restaurant',
    //   // 'shopping_mall',
    // ],
  } as Options;
  constructor(private router: Router, private cmnService: CmnServiceService) {}

  ngOnInit(): void {}
  handleAddressChange(e: any) {
    if (e) {
      let isInTypes = e?.types?.some((element: any) => {
        return this.validTypes.includes(element);
      });

      const businessDetail = {
        name: e?.name,
        address: e?.formatted_address,
      };

      if (isInTypes) {
        console.log(e);
        this.router.navigateByUrl(
          'account/' +
            e?.place_id +
            '/' +
            this.cmnService.encrypt(JSON.stringify(businessDetail))
        );
      } else {
        this.cmnService.showWarning('Please search another restaurant ');
        this.input = '';
      }
    }
  }
}
