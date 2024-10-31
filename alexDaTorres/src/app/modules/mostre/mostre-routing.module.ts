import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostreComponent } from './mostre.component';

const routes: Routes = [{ path: '', component: MostreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MostreRoutingModule { }
