import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmDishComponent } from './dishes/components/confirm-dish/confirm-dish.component';

import { DishesComponent } from './dishes/dishes.component';
import { MainBusinessComponent } from './main-business.component';
import { MenuComponent } from './menu/menu.component';
import { ProducersComponent } from './producers/producers.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainBusinessComponent,
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
        path: 'dishes',
        component: DishesComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'producers',
        component: ProducersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'dish-detail/:menuId/:dishId/:createdAt/:image/:ratingId',
        component: ConfirmDishComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainBusinessRoutingModule {}
