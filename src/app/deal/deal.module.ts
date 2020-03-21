import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealRoutingModule } from './deal-routing.module';
import { DealComponent } from './deal.component';


@NgModule({
  declarations: [DealComponent],
  imports: [
    CommonModule,
    DealRoutingModule
  ]
})
export class DealModule { }
