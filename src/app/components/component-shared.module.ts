import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from '../main-business/dashboard/dashboard.component';
import { ProducersComponent } from '../main-business/producers/producers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HelpComponent } from './help/help.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ProducersComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    HelpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],

  providers: [],
  bootstrap: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    ProducersComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
  ],
})
export class SharedModule {}
