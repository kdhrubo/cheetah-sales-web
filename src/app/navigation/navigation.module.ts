import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [];

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  exports: [
    NavbarComponent,
    RouterModule,
    FooterComponent
  ]
})
export class NavigationModule { }
