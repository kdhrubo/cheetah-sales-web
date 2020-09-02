import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from '../../guard/auth.guard';



const routes: Routes = [

  { path: 'charge', redirectTo: 'charge/list', pathMatch: 'full' },
  { path: 'charge/list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'charge/create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'charge/detail/:id', component: DetailComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeRoutingModule { }
