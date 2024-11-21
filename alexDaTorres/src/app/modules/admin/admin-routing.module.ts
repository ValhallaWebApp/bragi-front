import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ArtworkManagementComponent } from './components/artwork-management/artwork-management.component';
import { UserGuard } from 'src/app/services/user.guard';

const routes: Routes = [

  { path: '', component: AdminComponent},
  { path: 'artworks', component:ArtworkManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
