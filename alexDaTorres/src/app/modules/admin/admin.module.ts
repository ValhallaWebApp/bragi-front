import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ArtworkManagementComponent } from './components/artwork-management/artwork-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from '@angular/cdk/dialog';
import { EditArtworkDialogComponent } from './shared/dialogs/edit-artwork-dialog/edit-artwork-dialog.component';
import { DeleteArtworkDialogComponent } from './shared/dialogs/delete-artwork-dialog/delete-artwork-dialog.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { MatCardModule } from '@angular/material/card';
import { AdminReviewsComponent } from './components/admin-reviews/admin-reviews.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ArtworkManagementComponent,
    UserManagementComponent,
    SalesListComponent,
    AdminReviewsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIcon,
    MatButtonModule,
    FormsModule,
    TranslateModule,
    DialogModule,
    MatButtonModule
  ]
})
export class AdminModule { }
