import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../components/component-shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { BusinessesComponent } from './components/businesses/businesses.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VerifyBusinessComponent } from './components/verify-business/verify-business.component';
import { AddMenuItemComponent } from './components/add-menu-item/add-menu-item.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReportedDishesComponent } from './components/reported-dishes/reported-dishes.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    BusinessesComponent,
    VerifyBusinessComponent,
    AddMenuItemComponent,
    ReportedDishesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
})
export class AdminModule {}
