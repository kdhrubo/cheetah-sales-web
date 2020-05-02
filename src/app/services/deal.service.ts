import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Deal } from '../models/deal.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(private httpClient: HttpClient) { }

  save(deal: any): Observable<any> {
    const url = `${environment.api_base_url}/deals`;
    return this.httpClient
      .post<Observable<any>>(url, deal)
      .pipe(catchError(err => this.handleError(err, 'Error reorted while saving deal')));
  }

  //TODO: will be used for import deals
  saveAll(leads: Deal[]): Observable<any> {
    const url = `${environment.api_base_url}/deals/import`;
    const data = { 'leads': leads };
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-deals')));

  }


  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Deal>> {
    const url = `${environment.api_base_url}/deals/search?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;
    console.log('url - ' + url);

    return this.httpClient
      .get<Page<Deal>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-deals')));
  }


  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
