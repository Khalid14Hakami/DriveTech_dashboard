import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CreateNewStorageComponent } from './components/create-new-storage/create-new-storage.component';
import { StorageManagementComponent } from './components/storage-management/storage-management.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { StorageDetailsComponent } from './components/storage-details/storage-details.component';
import { CreateRoutineComponent } from './components/create-routine/create-routine.component';

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
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        path: 'storageDetail',
        component: StorageDetailsComponent,
      },
      {
        path: 'create-routine',
        component: CreateRoutineComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
