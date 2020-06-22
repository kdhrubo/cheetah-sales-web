import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { Page } from '../models/page.model';
import { Address } from '../models/address.model';

import { Note } from '../models/note.model';
import { Emails } from '../models/emails.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  save(contact: any): Observable<any> {
    const url = `${environment.api_base_url}/contacts`;
    return this.httpClient
      .post<Observable<any>>(url, contact)
      .pipe(catchError(err => this.handleError(err, 'save-contact')));
  }

  copy(id: any): Observable<any> {
    const url = `${environment.api_base_url}/contacts/copy/${id}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'copy-contact')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

  saveAll(contacts: Contact[]) : Observable<any>{
    const url = `${environment.api_base_url}/contacts/import`;

    const data = {'contacts' : contacts};

    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-contact')));

  }

  addEmails(id: any, emails: Emails): Observable<any>  {
    const url = `${environment.api_base_url}/contacts/${id}/emails`;
    return this.httpClient
      .post<Observable<any>>(url, emails)
      .pipe(catchError(err => this.handleError(err, 'save-email-address-contact')));
  }

  addAddress(id: any, address: Address): Observable<any>  {
    const url = `${environment.api_base_url}/contacts/${id}/addresses`;
    return this.httpClient
      .post<Observable<any>>(url, address)
      .pipe(catchError(err => this.handleError(err, 'save-address-contact')));
  }

  addNote(id: any, note: Note): Observable<any>  {
    const url = `${environment.api_base_url}/contacts/${id}/notes`;
    return this.httpClient
      .post<Observable<any>>(url, note)
      .pipe(catchError(err => this.handleError(err, 'save-phone-contact')));
  }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Contact>> {
    const url = `${environment.api_base_url}/contacts/q?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Page<Contact>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-contacts')));
  }

  findOne(id: string): Observable<Contact> {
    const url = `${environment.api_base_url}/contacts/findOne/` + id;
    return this.httpClient
      .get<Contact>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-contact')));
  }
}
