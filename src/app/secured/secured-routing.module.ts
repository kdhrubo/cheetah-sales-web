import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { SecuredComponent } from './secured.component';

const routes: Routes = [
  { path: '', component: SecuredComponent, canActivate: [AuthGuard],

  children: [
   
    { path: 'leads', loadChildren: () => import('./../lead/lead.module').then(m => m.LeadModule), canActivate: [AuthGuard] },
    { path: 'deals', loadChildren: () => import('./../deal/deal.module').then(m => m.DealModule) , canActivate: [AuthGuard]},
    { path: 'contacts', loadChildren: () => import('./../contact/contact.module').then(m => m.ContactModule), canActivate: [AuthGuard] },
    { path: 'accounts', loadChildren: () => import('./../account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
    { path: 'products', loadChildren: () => import('./../product/product.module').then(m => m.ProductModule) , canActivate: [AuthGuard]},
    { path: 'categories', loadChildren: () => import('./../category/category.module').then(m => m.CategoryModule), canActivate: [AuthGuard] },
    { path: 'cockpit', loadChildren: () => import('./../tenant/tenant.module').then(m => m.TenantModule), canActivate: [AuthGuard] },
    { path: 'docs', loadChildren: () => import('./../document/document.module').then(m => m.DocumentModule) , canActivate: [AuthGuard] },
    { path: 'pricebooks', loadChildren: () => import('./../price-book/price-book.module').then(m => m.PriceBookModule) , canActivate: [AuthGuard] },
    { path: 'product-price', loadChildren: () => import('./../product-price/product-price.module').then(m => m.ProductPriceModule) , canActivate: [AuthGuard] },
    { path: '', loadChildren: () => import('./../lead/lead.module').then(m => m.LeadModule), canActivate: [AuthGuard] },
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuredRoutingModule { }
