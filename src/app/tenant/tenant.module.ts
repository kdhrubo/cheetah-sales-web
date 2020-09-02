import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { DetailComponent } from './detail/detail.component';

import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CurrencyComponent } from './currency/currency.component';
import { UserComponent } from './user/user.component';
import { ChargeComponent } from './charge/charge.component';
import { ListComponent } from './charge/list/list.component';
import { CreateComponent } from './charge/create/create.component';
import { ChargeRoutingModule } from './charge/charge-routing.module';


@NgModule({
  declarations: [TenantComponent, DetailComponent, CurrencyComponent, UserComponent, ChargeComponent, ListComponent, CreateComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule,
    SharedModule,
    ChargeRoutingModule
  ]
})
export class TenantModule { }
