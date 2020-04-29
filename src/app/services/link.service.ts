import { Injectable } from '@angular/core';
import { EmailAddress } from '../models/emailaddress.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Link } from '../models/link.model';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private httpClient: HttpClient) {}

  save(link: Link): Observable<any> {
    const url = `${environment.api_base_url}/links`;
    return this.httpClient
      .post<Observable<any>>(url, link)
      .pipe(catchError((err) => this.handleError(err, 'save-link')));
  }

  search(rsql: string): Observable<Link[]> {
    const url = `${environment.api_base_url}/links/q?rsql=${rsql}`;
    return this.httpClient
      .get<Link[]>(url)
      .pipe(
        catchError((err) => this.handleError(err, 'find-all-search-links'))
      );
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
