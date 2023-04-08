import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/login/login.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { AuthGuardGuard } from '../guards/authGuard/auth-guard.guard';
import { AccountComponent } from './account/account.component';
import { PreLoginComponent } from './pre-login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: PreLoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      // {
      //   path: 'search',
      //   component: SearchComponent,
      // },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      // {
      //   path: 'account/:id/:detail',
      //   component: AccountComponent,
      // },
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
export class PreLoginRoutingModule {}
