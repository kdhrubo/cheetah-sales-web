import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private httpClient: HttpClient) {}

  save(lead: any): Observable<any> {
    const url = `${environment.api_base_url}/currencies`;
    return this.httpClient
      .post<Observable<any>>(url, lead)
      .pipe(catchError(err => this.handleError(err, 'save-lead')));
  }

  searchAll(
    rsql: string
  ): Observable<Currency[]> {
    const url = `${environment.api_base_url}/currencies/q?rsql=${rsql}`;

    return this.httpClient
      .get<Currency[]>(url)
      .pipe(catchError(err => this.handleError(err, 'search-all-currencies')));
  }

  findOne(id: string): Observable<Currency> {
    const url = `${environment.api_base_url}/currencies/findOne/` + id;
    return this.httpClient
      .get<Currency>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-currency')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

}
