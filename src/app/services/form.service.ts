import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) { }


  getFields(name: string): Observable<FormlyFieldConfig[]> {
    const url = `${environment.api_base_url}/forms/${name}`;
    return this.httpClient
      .get<FormlyFieldConfig[]>(url)
      .pipe(catchError(err => this.handleError(err, 'find-form-by-name')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
