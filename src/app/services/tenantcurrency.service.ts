import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Lead } from '../models/lead.model';
import { Page } from '../models/page.model';
import { TenantCurrency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class TenantCurrencyService {
  constructor(private httpClient: HttpClient) {}

  add(tc: any): Observable<any> {
    const url = `${environment.api_base_url}/tenantcurrencies/add`;
    return this.httpClient
      .post<Observable<any>>(url, tc)
      .pipe(catchError(err => this.handleError(err, 'add-tenant-currency')));
  }

  activate(id: any): Observable<any> {
    const url = `${environment.api_base_url}/tenantcurrencies/${id}/activate`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'activate-tenant-currency')));
  }

  makeBase(id: any): Observable<any> {
    const url = `${environment.api_base_url}/tenantcurrencies/${id}/setBase`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'setBase-tenant-currency')));
  }

  searchAll(
    rsql: string
  ): Observable<TenantCurrency[]> {
    const url = `${environment.api_base_url}/tenantcurrencies/q?rsql=${rsql}`;

    return this.httpClient
      .get<TenantCurrency[]>(url)
      .pipe(catchError(err => this.handleError(err, 'search-all-tenantcurrencies')));
  }

  findOne(id: string): Observable<Lead> {
    const url = `${environment.api_base_url}/tenantcurrencies/findOne/` + id;
    return this.httpClient
      .get<Lead>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-lead')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

}
