import { NgModule } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';

import { MainBusinessComponent } from './main-business.component';
import { MainBusinessRoutingModule } from './main-business-routing.module';

import { SharedModule } from '../components/component-shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DishesComponent } from './dishes/dishes.component';
import { MenuComponent } from './menu/menu.component';

import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDishComponent } from './dishes/components/confirm-dish/confirm-dish.component';
import { ReportDishComponent } from './dishes/components/report-dish/report-dish.component';
import { SelectIngredientComponent } from './dishes/components/select-ingredient/select-ingredient.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    MainBusinessComponent,

    DishesComponent,
    MenuComponent,

    ProfileComponent,
    SettingsComponent,
    ConfirmDishComponent,
    ReportDishComponent,
    SelectIngredientComponent,
  ],
  imports: [
    CommonModule,
    MainBusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatChipsModule,
    GooglePlaceModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [DatePipe],
  bootstrap: [],
})
export class MainBusinessModule {}
