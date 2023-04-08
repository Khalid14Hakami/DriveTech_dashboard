import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StorageManagementComponent } from './components/storage-management/storage-management.component';
import { CreateNewStorageComponent } from './components/create-new-storage/create-new-storage.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { StorageDetailsComponent } from './components/storage-details/storage-details.component';
import { CreateRoutineComponent } from './components/create-routine/create-routine.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    HeaderComponent,
    StorageManagementComponent,
    UserManagementComponent,
    CreateNewStorageComponent,
    TaskManagementComponent,
    CreateTaskComponent,
    CreateUserComponent,
    DashboardComponent,
    StorageDetailsComponent,
    CreateRoutineComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
