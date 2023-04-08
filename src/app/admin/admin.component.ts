import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  theme = 'light';
  @ViewChild('sidenav', { static: false })
  sideNav!: MatSidenav;
  @ViewChild('header')
  header!: HeaderComponent;
  innerWidth = 0;
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.isOpenedSidebar();
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  isOpenedSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1000) {
      this.sideNav.close();
      this.sideNav.mode = 'over';
      this.header.isOpened = false;
    } else {
      this.sideNav.mode = 'side';
      this.sideNav.open();
      this.header.isOpened = true;
    }
  }

  buttonToggle() {
    this.sideNav.toggle();
  }

  onLinkClicked() {
    if (this.innerWidth <= 1000) {
      this.sideNav.close();
      this.header.isOpened = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1000) {
      this.sideNav.close();
      this.sideNav.mode = 'over';
      this.header.isOpened = false;
    } else {
      this.sideNav.mode = 'side';
      this.sideNav.open();
      this.header.isOpened = true;
    }
  }
}
