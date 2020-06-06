import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { PickList } from '../models/picklist.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PicklistService {

  constructor(private httpClient: HttpClient) {}

  findAll(domain: string): Observable<PickList[]> {

    const url = `${environment.api_base_url}/picklists/${domain}`;

    return this.httpClient
      .get<any[]>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-picklist')));

  }

  

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
