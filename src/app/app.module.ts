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




@NgModule({
  declarations: [
    AppComponent,
    PicklistComponent,
    SelectwrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormlyModule.forRoot({
      wrappers: [
        { name: 'formly-select-wrapper', component: SelectwrapperComponent },
      ],
      types: [
        { name: 'pickList', component: PicklistComponent },
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
