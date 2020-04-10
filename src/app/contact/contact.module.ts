import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ListComponent } from './list/list.component';
import { ImportComponent } from './import/import.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [ContactComponent, ListComponent, ImportComponent, CreateComponent,  DetailComponent, ActivityComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule
  ]
})
export class ContactModule { }
