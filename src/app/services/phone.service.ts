import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Phone } from '../models/phone.model';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  constructor(private httpClient: HttpClient) {}

  save(phone: Phone): Observable<any> {
    const url = `${environment.api_base_url}/phones`;
    return this.httpClient
      .post<Observable<any>>(url, phone)
      .pipe(catchError((err) => this.handleError(err, 'save-phone')));
  }

  search(rsql: string): Observable<Phone[]> {
    const url = `${environment.api_base_url}/phones/q?rsql=${rsql}`;
    return this.httpClient
      .get<Phone[]>(url)
      .pipe(
        catchError((err) => this.handleError(err, 'find-all-search-phones'))
      );
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
