import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealComponent } from './deal.component';

const routes: Routes = [{ path: '', component: DealComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
