import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';

import { DealComponent } from './deal.component';

const routes: Routes = [
//  { path: '', component: DealComponent },
  { path: '',  redirectTo : 'list' , pathMatch : 'full'  },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealRoutingModule { }
