import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NoteComponent } from './components/note/note.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityComponent } from './components/activity/activity.component';
import { TaskComponent } from './components/task/task.component';
import { AddressComponent } from './components/address/address.component';
import { EmailaddressComponent } from './components/emailaddress/emailaddress.component';
import { SocialComponent } from './components/social/social.component';
import { PhoneComponent } from './components/phone/phone.component';


@NgModule({
  declarations: [NoteComponent, ActivityComponent, TaskComponent, AddressComponent, EmailaddressComponent, SocialComponent, PhoneComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule

  ],
  exports: [NoteComponent, ActivityComponent, TaskComponent, AddressComponent, EmailaddressComponent, SocialComponent, PhoneComponent]
})
export class SharedModule { }
