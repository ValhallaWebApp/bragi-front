import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ArtworkManagementComponent } from './components/artwork-management/artwork-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ArtworkManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
