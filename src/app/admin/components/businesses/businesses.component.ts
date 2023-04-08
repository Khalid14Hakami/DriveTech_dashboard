import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';
import { AddMenuItemComponent } from '../add-menu-item/add-menu-item.component';
import { VerifyBusinessComponent } from '../verify-business/verify-business.component';

export interface Business {
  createdAt: string;
  createdBy: string;
  establishment: string;
  id: number;
  isVerified: boolean;
  menuFile: any;
  modifiedAt: string;
  modifiedBy: string;
  placeId: string;
  status: number;
  city: string;
  country: string;
}
@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.scss'],
})
export class BusinessesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  businesses: Business[] = [
    // {
    //   name: 'Restaurant1',
    //   city: 'London',
    //   country: 'United Kingdom',
    //   status: 'Unverified',
    //   action: ['Invite', 'Add menu item'],
    // },
    // {
    //   name: 'Restaurant2',
    //   city: 'London',
    //   country: 'United Kingdom',
    //   status: 'Verified',
    //   action: ['Verify'],
    // },
    // {
    //   name: 'Restaurant3',
    //   city: 'London',
    //   country: 'United Kingdom',
    //   status: 'Invited',
    //   action: ['View Report(5)'],
    // },
    // {
    //   name: 'Restaurant4',
    //   city: 'London',
    //   country: 'United Kingdom',
    //   status: 'Unverified',
    //   action: ['Invite', 'Add menu item'],
    // },
    // {
    //   name: 'Restaurant5',
    //   city: 'London',
    //   country: 'United Kingdom',
    //   status: 'Verified',
    //   action: ['Invite', 'Add menu item'],
    // },
    // {
    //   name: 'Restaurant6',
    //   city: 'London',
    //   country: 'United Kingdom',
    //   status: 'Invited',
    //   action: ['Invite', 'Add menu item'],
    // },
  ];
  businessCopy: Business[] = [];
  selectedCity = 'all';
  selectedStatus = 'all';
  selectedCountry = 'all';
  countries: any[] = [];
  dataSource!: MatTableDataSource<Business>;
  search = '';
  displayedColumns: string[] = [
    'establishment',
    'city',
    'country',
    'status',
    'action',
  ];
  cities: any[] = [];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    public cmnService: CmnServiceService,
    private aRoute: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getBusinesses();
  }

  onSearch(searchStr: string) {
    this.dataSource.filter = searchStr.trim().toLowerCase();
  }

  getBusinesses() {
    this.cmnService.showLoader();
    this.http.get(environment.apiUrl + 'BusinessProfile/getAll').subscribe(
      (res: any) => {
        this.cmnService.hideLoader();
        if (res?.success) {
          this.businesses = res?.data;
          this.businessCopy = res?.data;
          this.cities = [
            ...new Set(this.businesses.map((business: any) => business.city)),
          ];
          this.cities = this.cities.filter((c) => c);

          this.countries = [
            ...new Set(
              this.businesses.map((business: any) => business.country)
            ),
          ];
          this.countries = this.countries.filter((c) => c);
          this.dataSource = new MatTableDataSource(this.businesses);
          if (this.aRoute.snapshot.params['status']) {
            this.selectedStatus = this.aRoute.snapshot.params['status'];
            this.onStatusChange(this.selectedStatus);
          }
        }
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }

  onAddMenuClick(item: any) {
    this.dialog.open(AddMenuItemComponent, {
      width: '60%',
      disableClose: false,
      data: item,
    });
  }

  onInviteOrAddClick(item: any) {
    const verifyDialog = this.dialog.open(VerifyBusinessComponent, {
      width: '480px',
      disableClose: false,
      data: item,
    });

    verifyDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.getBusinesses();
      }
    });
  }

  onCityChange(city: any) {
    this.selectedStatus = 'all';
    this.selectedCountry = 'all';
    if (city == 'all') {
      this.dataSource = new MatTableDataSource(this.businessCopy);
    } else {
      let data = this.businesses.filter((data: Business) => data.city == city);
      this.dataSource = new MatTableDataSource(data);
    }
  }
  onCountryChange(country: any) {
    this.selectedStatus = 'all';
    this.selectedCity = 'all';
    if (country == 'all') {
      this.dataSource = new MatTableDataSource(this.businessCopy);
    } else {
      let data = this.businesses.filter(
        (data: Business) => data.country == country
      );
      this.dataSource = new MatTableDataSource(data);
    }
  }

  onStatusChange(status: any) {
    this.selectedCity = 'all';
    this.selectedCountry = 'all';
    if (status == 'all') {
      this.dataSource = new MatTableDataSource(this.businessCopy);
    } else {
      if (status == 'Verified') {
        let verifiedData = this.businesses.filter(
          (data: Business) => data.isVerified
        );
        this.dataSource = new MatTableDataSource(verifiedData);
      } else if (status == 'Unverified') {
        let unVerified = this.businesses.filter(
          (data: Business) => !data.isVerified
        );
        this.dataSource = new MatTableDataSource(unVerified);
      }
    }
  }
}
