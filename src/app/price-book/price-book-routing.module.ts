import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AuthGuard } from '../guard/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [

  { path: '', component: ListComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  { path: 'import', component: ImportComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceBookRoutingModule { }
