import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Lead } from '../models/lead.model';
import { Page } from '../models/page.model';
import { Note } from '../models/note.model';

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

  delete(id: any): Observable<any>  {
    const url = `${environment.api_base_url}/leads/${id}`;

    return this.httpClient
      .delete<Observable<any>>(url, {})
      .pipe(catchError(err => this.handleError(err, 'delete-lead')));

  }

  copy(id: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/${id}/copy`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'copy-lead')));
  }

  saveAll(leads: Lead[]): Observable<any> {
    const url = `${environment.api_base_url}/leads/import`;
    // const data = {leads : leads};
    return this.httpClient
      .post<Observable<any>>(url, {leads})
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

  addProduct(id: any, product: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/${id}/products`;
    return this.httpClient
      .post<Observable<any>>(url, product)
      .pipe(catchError(err => this.handleError(err, 'add-lead-product')));
  }

  removeProduct(id: any, productId: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/${id}/products/${productId}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'renove-lead-product')));
  }

  addDocument(id: any, document: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/${id}/documents`;
    return this.httpClient
      .post<Observable<any>>(url, document)
      .pipe(catchError(err => this.handleError(err, 'add-lead-document')));
  }

  removeDocument(id: any, docId: any): Observable<any> {
    const url = `${environment.api_base_url}/leads/${id}/documents/${docId}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'renove-lead-product')));
  }

  addNote(id: any, note: Note): Observable<any>  {
    const url = `${environment.api_base_url}/leads/${id}/notes`;
    return this.httpClient
      .post<Observable<any>>(url, note)
      .pipe(catchError(err => this.handleError(err, 'save-lead-note')));
  }
}
