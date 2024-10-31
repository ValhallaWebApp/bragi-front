import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhoComponent } from './who.component';

const routes: Routes = [{ path: '', component: WhoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhoRoutingModule { }
