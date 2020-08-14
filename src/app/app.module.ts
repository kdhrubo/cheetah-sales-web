import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationModule } from './navigation/navigation.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyBootstrapModule, FormlyFieldSelect } from '@ngx-formly/bootstrap';
import { PicklistComponent } from './common/picklist/picklist.component';
import { AccountpicklistComponent } from './common/accountpicklist/accountpicklist.component';
import { SharedModule } from './shared/shared.module';
import { ContactPicklistComponent } from './common/contact-picklist/contact-picklist.component';
import { FormlyFieldFile } from './common/file/filetype.component';
import { FileValueAccessor } from './common/file/file-value-accessor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PriceBookComponent } from './price-book/price-book.component';
import { ProductPriceComponent } from './product-price/product-price.component';

export function EmailValidatorMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid value`;
}

@NgModule({
  declarations: [
    AppComponent,
    PicklistComponent,
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
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'pattern', message: EmailValidatorMessage}
      ],
      wrappers: [
      ],
      types: [
        { name: 'picklist', component: PicklistComponent },
        { name: 'file', component: FormlyFieldFile },
        { name: 'accountLookup', component: AccountpicklistComponent },
        { name: 'contactLookup', component: ContactPicklistComponent }
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
