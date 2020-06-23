import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Lead } from '../models/lead.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  constructor(private httpClient: HttpClient) {}

  save(lead: any): Observable<any> {
    const url = `${environment.api_base_url}/leads`;
    return this.httpClient
      .post<Observable<any>>(url, lead)
      .pipe(catchError(err => this.handleError(err, 'save-lead')));
  }

  convert(config: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/convert`;
    return this.httpClient
      .post<Observable<any>>(url, config)
      .pipe(catchError(err => this.handleError(err, 'convert-lead')));
  }

  copy(id: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/copy/${id}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'copy-lead')));
  }

  saveAll(leads: Lead[]) : Observable<any>{
    const url = `${environment.api_base_url}/leads/import`;
    const data = {'leads' : leads};
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-lead')));

  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Lead>> {
    const url = `${environment.api_base_url}/leads/q?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Page<Lead>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-leads')));
  }

  findOne(id: string): Observable<Lead> {
    const url = `${environment.api_base_url}/leads/findOne/` + id;
    return this.httpClient
      .get<Lead>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-lead')));
  }
}
