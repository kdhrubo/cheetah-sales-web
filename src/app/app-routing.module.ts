import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  }, 
  { path: 'leads', loadChildren: () => import('./lead/lead.module').then(m => m.LeadModule) , canActivate: [AuthGuard]}, 
  { path: 'deals', loadChildren: () => import('./deal/deal.module').then(m => m.DealModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
