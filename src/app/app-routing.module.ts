import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/authGuard/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pre-login/pre-login.module').then((m) => m.PreLoginModule),
  // },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
