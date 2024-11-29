import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MatCardModule } from '@angular/material/card'; // Material components se usi Angular Material
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { ReviewUserListComponent } from './components/reviews/review-user-list/review-user-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditReviewDialogComponent } from 'src/app/components/dialog/edit-review-dialog/edit-review-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserComponent,
    OrderHistoryComponent,
    ProfileComponent,
    WishlistComponent,
    ReviewUserListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
  ],
  exports:[]
})
export class UserModule { }
