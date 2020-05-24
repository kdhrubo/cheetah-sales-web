import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private httpClient: HttpClient) { }

  findOne(): Observable<any> {
    const url = `${environment.api_base_url}/tenants/findOne`;
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-tenant')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
