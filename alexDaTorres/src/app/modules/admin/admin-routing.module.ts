import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ArtworkManagementComponent } from './components/artwork-management/artwork-management.component';
import { UserGuard } from 'src/app/services/user.guard';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { AdminReviewsComponent } from './components/admin-reviews/admin-reviews.component';

const routes: Routes = [

  { path: '', component: AdminComponent},
  { path: 'artworks', component:ArtworkManagementComponent},
  { path: 'vendite', component:SalesListComponent},
  { path: 'commenti', component: AdminReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
