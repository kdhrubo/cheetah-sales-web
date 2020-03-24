import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../guard/auth.guard';
import { DetailComponent } from './detail/detail.component';



const routes: Routes = [
  { path: '',  redirectTo : 'list' , pathMatch : 'full'  },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
