import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { ChargeRoutingModule } from './charge-routing.module';



@NgModule({
  declarations: [ DetailComponent , ListComponent, CreateComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule,
    SharedModule,
    ChargeRoutingModule
  ]
})
export class ChargeModule { }
