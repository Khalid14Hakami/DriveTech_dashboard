import { NgModule } from '@angular/core';
import { SharedModule } from '../components/component-shared.module';
import { PreLoginRoutingModule } from './pre-login-routing.module';
import { PreLoginComponent } from './pre-login.component';
import { SearchComponent } from './search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { AccountComponent } from './account/account.component';
import { VerifyBusinessComponent } from './verify-business/verify-business.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    PreLoginComponent,
    SearchComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AccountComponent,
    VerifyBusinessComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PreLoginRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    GooglePlaceModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [],
})
export class PreLoginModule {}
