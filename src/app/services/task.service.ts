import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {}

  save(activity: Task): Observable<any> {
    const url = `${environment.api_base_url}/tasks`;
    return this.httpClient
      .post<Observable<any>>(url, activity)
      .pipe(catchError(err => this.handleError(err, 'save-task')));
  }

  search(
    rsql: string
  ): Observable<Task[]> {
    const url = `${environment.api_base_url}/tasks/q?rsql=${rsql}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Task[]>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-tasks')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

}
