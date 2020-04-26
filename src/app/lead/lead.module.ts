import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadComponent } from './lead.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ImportComponent } from './import/import.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LeadComponent, ListComponent, CreateComponent, DetailComponent, ImportComponent, ViewComponent],
  imports: [
    CommonModule,
    LeadRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule,
    SharedModule
  ]
})
export class LeadModule { }
