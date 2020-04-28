import { Injectable } from '@angular/core';
import { EmailAddress } from '../models/emailaddress.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailaddressService {
  constructor(private httpClient: HttpClient) {}

  save(emailaddress: EmailAddress): Observable<any> {
    const url = `${environment.api_base_url}/emailaddresses`;
    return this.httpClient
      .post<Observable<any>>(url, emailaddress)
      .pipe(catchError((err) => this.handleError(err, 'save-emailaddress')));
  }

  search(rsql: string): Observable<EmailAddress[]> {
    const url = `${environment.api_base_url}/emailaddresses/q?rsql=${rsql}`;
    return this.httpClient
      .get<EmailAddress[]>(url)
      .pipe(
        catchError((err) => this.handleError(err, 'find-all-search-emails'))
      );
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
