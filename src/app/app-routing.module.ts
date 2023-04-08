import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/authGuard/auth-guard.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./pre-login/pre-login.module').then((m) => m.PreLoginModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./pre-login/pre-login.module').then((m) => m.PreLoginModule),
  },
  {
    path: 'business',
    loadChildren: () =>
      import('./main-business/main-business.module').then(
        (m) => m.MainBusinessModule
      ),
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
