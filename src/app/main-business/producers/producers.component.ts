import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';
import { CmnServiceService } from 'src/app/service/cmn-service/cmn-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss'],
})
export class ProducersComponent implements OnInit {
  displayedColumns: string[] = ['establishment', 'address'];
  dataSourceCopy = [];
  dataSource!: MatTableDataSource<any>;
  search = '';
  user: any;
  constructor(
    public cmnService: CmnServiceService,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getProducers();
  }

  onSearch(searchStr: string) {
    this.dataSource.filter = searchStr.trim().toLowerCase();
  }

  getProducers() {
    this.cmnService.showLoader();

    this.http
      .get(
        environment.apiUrl +
          'Producer/getProducers?loggedInUserId=' +
          this.user.UserId
      )
      .subscribe(
        (res: any) => {
          this.cmnService.hideLoader();
          if (res?.success) {
            this.dataSource = new MatTableDataSource(res?.data);
            this.dataSourceCopy = res?.data;
          }
        },
        (err) => {
          this.cmnService.hideLoader();
        }
      );
  }

  // onSearch(searchVal: any) {
  //   if (searchVal.trim().length > 0) {
  //     this.dataSourceCopy = this.dataSourceCopy.filter((d: any) =>
  //       d?.name?.toLowerCase().includes(searchVal.toLowerCase())
  //     );
  //   } else {
  //     this.dataSourceCopy = this.dataSource;
  //   }
  // }
}
