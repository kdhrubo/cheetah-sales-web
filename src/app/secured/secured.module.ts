import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecuredComponent } from './secured.component';

import { SharedModule } from './../shared/shared.module';
import { NavigationModule } from './../navigation/navigation.module';





@NgModule({
  declarations: [SecuredComponent],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    NavigationModule,
    SharedModule,
  ]
})
export class SecuredModule { }
