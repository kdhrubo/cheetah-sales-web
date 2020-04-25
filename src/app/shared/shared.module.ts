import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NoteComponent } from './components/note/note.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityComponent } from './components/activity/activity.component';


@NgModule({
  declarations: [NoteComponent, ActivityComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule
  ],
  exports: [NoteComponent, ActivityComponent]
})
export class SharedModule { }
