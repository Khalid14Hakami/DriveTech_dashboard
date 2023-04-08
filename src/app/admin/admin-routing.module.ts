import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CreateNewStorageComponent } from './components/create-new-storage/create-new-storage.component';
import { StorageManagementComponent } from './components/storage-management/storage-management.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
        path: 'storage-management',
        component: StorageManagementComponent,
      },
      {
        path: 'createNewStorage',
        component: CreateNewStorageComponent,
      },
      {
        path: 'task-management',
        component: TaskManagementComponent,
      },
      {
        path: 'create-task',
        component: CreateTaskComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
