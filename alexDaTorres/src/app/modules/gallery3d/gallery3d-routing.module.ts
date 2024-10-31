import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Gallery3dComponent } from './gallery3d.component';

const routes: Routes = [{ path: '', component: Gallery3dComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Gallery3dRoutingModule { }
