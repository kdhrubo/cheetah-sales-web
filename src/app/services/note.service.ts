import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private httpClient: HttpClient) {}

  save(note: Note): Observable<any> {
    const url = `${environment.api_base_url}/notes`;
    return this.httpClient
      .post<Observable<any>>(url, note)
      .pipe(catchError((err) => this.handleError(err, 'save-note')));
  }

  search(rsql: string): Observable<Note[]> {
    const url = `${environment.api_base_url}/notes/q?rsql=${rsql}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Note[]>(url)
      .pipe(
        catchError((err) => this.handleError(err, 'find-all-search-notes'))
      );
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
