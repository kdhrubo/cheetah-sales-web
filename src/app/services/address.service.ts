import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  save(address: Address): Observable<any> {
    const url = `${environment.api_base_url}/postal`;
    return this.httpClient
      .post<Observable<any>>(url, address)
      .pipe(catchError((err) => this.handleError(err, 'save-addresses')));
  }

  search(rsql: string): Observable<Address[]> {
    const url = `${environment.api_base_url}/postal/q?rsql=${rsql}`;
    return this.httpClient
      .get<Address[]>(url)
      .pipe(
        catchError((err) => this.handleError(err, 'find-all-search-address'))
      );
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
