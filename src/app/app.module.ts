import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationModule } from './navigation/navigation.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule, FormlyFieldSelect } from '@ngx-formly/bootstrap';
import { PicklistComponent } from './common/picklist/picklist.component';
import { SelectwrapperComponent } from './common/selectwrapper/selectwrapper.component';
import { AccountpicklistComponent } from './common/accountpicklist/accountpicklist.component';
import { SharedModule } from './shared/shared.module';
import { ContactPicklistComponent } from './common/contact-picklist/contact-picklist.component';



@NgModule({
  declarations: [
    AppComponent,
    PicklistComponent,
    SelectwrapperComponent,
    AccountpicklistComponent,
    ContactPicklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    FormlyModule.forRoot({
      wrappers: [
        { name: 'formly-select-wrapper', component: SelectwrapperComponent },
      ],
      types: [
        { name: 'picklist', component: PicklistComponent },
        { name: 'accountLookup', component: AccountpicklistComponent },
        { name: 'contactLookup', component: ContactPicklistComponent },
        {
          name: 'select',
          component: FormlyFieldSelect,
          wrappers: ['formly-select-wrapper']
        }
      ],
    }),
    FormlyBootstrapModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
