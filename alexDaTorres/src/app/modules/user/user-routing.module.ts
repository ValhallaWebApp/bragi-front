import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ReviewUserListComponent } from './components/reviews/review-user-list/review-user-list.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    canActivate: [AuthGuard], // Assicurati che l'utente sia autenticato per accedere a queste rotte
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'reviews', component: ReviewUserListComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
