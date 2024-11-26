import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ArtworkManagementComponent } from './components/artwork-management/artwork-management.component';
import { UserGuard } from 'src/app/services/user.guard';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { AdminReviewsComponent } from './components/admin-reviews/admin-reviews.component';
import { AdminGuard } from 'src/app/services/admin.guard';
const routes: Routes = [
  {
    path: '', component: AdminComponent,
    canActivate: [AdminGuard], // Assicurati che l'utente sia autenticato per accedere a queste rotte
    children: [
      { path: 'artworks', component:ArtworkManagementComponent},
      { path: 'vendite', component:SalesListComponent},
      { path: 'commenti', component: AdminReviewsComponent },
    ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
