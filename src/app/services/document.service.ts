import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentItem } from '../models/document.model';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  saveFolder(docItem: DocumentItem): Observable<any> {
    console.log('Saving folder');
    const url = `${environment.api_base_url}/docs/folders`;
    return this.httpClient
      .post<Observable<any>>(url, docItem)
      .pipe(catchError(err => this.handleError(err, 'save-folder')));
  }

  search(
    rsql: string
  ): Observable<DocumentItem[]> {
    const url = `${environment.api_base_url}/docs/q?rsql=${rsql}`;


    return this.httpClient
      .get<DocumentItem[]>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-docs')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

}
