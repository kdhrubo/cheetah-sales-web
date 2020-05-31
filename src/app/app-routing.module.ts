import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'leads', loadChildren: () => import('./lead/lead.module').then(m => m.LeadModule), canActivate: [AuthGuard] },
  { path: 'deals', loadChildren: () => import('./deal/deal.module').then(m => m.DealModule) },
  { path: 'contacts', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule), canActivate: [AuthGuard] },
  { path: 'accounts', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  { path: 'cockpit', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule), canActivate: [AuthGuard] },
  { path: 'guest', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule) },
  { path: 'docs', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule) , canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
