import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoxsettingService {

  constructor(private httpClient: HttpClient) { }

  save(box: any): Observable<any> {
    console.log('Saving box settings - ' + JSON.stringify(box));
    const url = `${environment.api_base_url}/cockpit/box`;
    return this.httpClient
      .post<Observable<any>>(url, box)
      .pipe(catchError(err => this.handleError(err, 'save-box-settings')));
  }

  findOne(): Observable<any> {
    const url = `${environment.api_base_url}/cockpit/box`;
    return this.httpClient
      .get<any>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-box')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
