import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealRoutingModule } from './deal-routing.module';
import { DealComponent } from './deal.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
//import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [DealComponent, CreateComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    DealRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule,
    SharedModule,
    NgbModule
  ]
})
export class DealModule { }
