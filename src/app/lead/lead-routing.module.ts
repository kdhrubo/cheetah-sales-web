import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadComponent } from './lead.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../guard/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: '',  redirectTo : 'list' , pathMatch : 'full'  },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  { path: 'import', component: ImportComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
