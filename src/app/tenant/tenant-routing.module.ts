import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantComponent } from './tenant.component';
import { AuthGuard } from '../guard/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { CurrencyComponent } from './currency/currency.component';


const routes: Routes = [
  { path: '', component: TenantComponent , canActivate: [AuthGuard],

  children: [
    { path: 'company', component: DetailComponent, canActivate: [AuthGuard] },
    { path: 'currency', component: CurrencyComponent, canActivate: [AuthGuard] },


    { path: '', redirectTo: 'company'}

  ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
