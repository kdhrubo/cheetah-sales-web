import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { DetailComponent } from './detail/detail.component';
import { BoxsettingsComponent } from './boxsettings/boxsettings.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [TenantComponent, DetailComponent, BoxsettingsComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule,
    SharedModule
  ]
})
export class TenantModule { }
