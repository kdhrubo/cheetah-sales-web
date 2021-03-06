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
import { SocialComponent } from './components/social/social.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { ProductRelationComponent } from './components/product-relation/product-relation.component';
import { DocumentRelationComponent } from './components/document-relation/document-relation.component';
import { YesNoPipe } from './pipe/yes-no.pipe';
import { DealLineItemComponent } from './components/deal-line-item/deal-line-item.component';


@NgModule({
  declarations: [
    NoteComponent,
    ActivityComponent,
    TaskComponent,
    AddressComponent,
    SocialComponent,
    CommunicationComponent,
    ProductRelationComponent,
    DocumentRelationComponent,
    YesNoPipe,
    DealLineItemComponent
    ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule.forChild(),
    FormlyBootstrapModule

  ],
  exports: [
    NoteComponent,
    ActivityComponent,
    TaskComponent,
    AddressComponent,
    SocialComponent,
    CommunicationComponent,
    ProductRelationComponent,
    DocumentRelationComponent,
    YesNoPipe,
    DealLineItemComponent]
})
export class SharedModule { }
