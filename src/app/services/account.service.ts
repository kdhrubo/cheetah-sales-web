import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page.model';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Account>> {
    const url = `${environment.api_base_url}/accounts/q?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Page<Account>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-contacts')));
  }

  findOne(id: string): Observable<Account> {
    const url = `${environment.api_base_url}/accounts/findOne/` + id;
    return this.httpClient
      .get<Account>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-account')));
  }

  save(account: any): Observable<any> {
    const url = `${environment.api_base_url}/accounts`;
    return this.httpClient
      .post<Observable<any>>(url, account)
      .pipe(catchError(err => this.handleError(err, 'Error reorted while saving accounts')));
  }

  saveAll(accounts: Account[]): Observable<any> {
    const url = `${environment.api_base_url}/accounts/import`;
    const data = { 'accounts': accounts };
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'Error while bulk import of accounts')));

  }

  delete(id: any): Observable<any>  {
    const url = `${environment.api_base_url}/accounts/${id}`;

    return this.httpClient
      .delete<Observable<any>>(url, {})
      .pipe(catchError(err => this.handleError(err, 'delete-account')));

  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
