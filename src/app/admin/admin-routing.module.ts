import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { DashboardComponent } from '../main-business/dashboard/dashboard.component';
import { ProducersComponent } from '../main-business/producers/producers.component';
import { AdminComponent } from './admin.component';
import { BusinessesComponent } from './components/businesses/businesses.component';
import { ReportedDishesComponent } from './components/reported-dishes/reported-dishes.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'businesses',
        component: BusinessesComponent,
      },
      {
        path: 'businesses/:status',
        component: BusinessesComponent,
      },
      {
        path: 'producers',
        component: ProducersComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'reported-dishes',
        component: ReportedDishesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
