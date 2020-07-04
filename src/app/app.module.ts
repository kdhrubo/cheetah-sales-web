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
import { FormlyFieldFile } from './common/file/filetype.component';
import { FileValueAccessor } from './common/file/file-value-accessor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'ng-sidebar';
import { PriceBookComponent } from './price-book/price-book.component';
import { ProductPriceComponent } from './product-price/product-price.component';



@NgModule({
  declarations: [
    AppComponent,
    PicklistComponent,
    SelectwrapperComponent,
    AccountpicklistComponent,
    ContactPicklistComponent,
    FileValueAccessor,
    FormlyFieldFile,
    PriceBookComponent,
    ProductPriceComponent
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
    SidebarModule.forRoot(),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ],
      wrappers: [
        { name: 'formly-select-wrapper', component: SelectwrapperComponent },
      ],
      types: [
        { name: 'picklist', component: PicklistComponent },
        { name: 'file', component: FormlyFieldFile },
        { name: 'accountLookup', component: AccountpicklistComponent },
        { name: 'contactLookup', component: ContactPicklistComponent },
        {
          name: 'select',
          component: FormlyFieldSelect,
          wrappers: ['formly-select-wrapper']
        }
      ],
    }),
    FormlyBootstrapModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }) // ToastrModule added
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
