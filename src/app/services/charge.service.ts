import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Charge } from '../models/charge/charge.model';
import { Page } from '../models/page.model';


@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  constructor(private httpClient: HttpClient) { }

  save(charge: any): Observable<any> {
    const url = `${environment.api_base_url}/charge`;
    return this.httpClient
      .post<Observable<any>>(url, charge)
      .pipe(catchError(err => this.handleError(err, 'save-charge')));
  }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Charge>> {
    const url = `${environment.api_base_url}/charge/search?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Page<Charge>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-Charge')));
  }


  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
