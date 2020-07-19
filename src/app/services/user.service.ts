import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  add(user: any): Observable<any> {
    const url = `${environment.api_base_url}/users/add`;
    return this.httpClient
      .post<Observable<any>>(url, user)
      .pipe(catchError(err => this.handleError(err, 'add-user')));
  }


  delete(id: any): Observable<any>  {
    const url = `${environment.api_base_url}/users/${id}`;

    return this.httpClient
      .delete<Observable<any>>(url, {})
      .pipe(catchError(err => this.handleError(err, 'delete-user')));

  }

  findOne(id: string): Observable<User> {
    const url = `${environment.api_base_url}/users/findOne/` + id;
    return this.httpClient
      .get<User>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-user')));
  }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<User>> {
    const url = `${environment.api_base_url}/users/q?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    return this.httpClient
      .get<Page<User>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-user')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }


}
