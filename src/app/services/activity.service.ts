import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Activity } from '../models/activity.model';
import { Page } from '../models/page.model';


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient: HttpClient) {}

  save(activity: Activity): Observable<any> {
    const url = `${environment.api_base_url}/activities`;
    return this.httpClient
      .post<Observable<any>>(url, activity)
      .pipe(catchError(err => this.handleError(err, 'save-activity')));
  }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Activity>> {
    const url = `${environment.api_base_url}/activities/q?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    // console.log('url - ' + url);

    return this.httpClient
      .get<Page<Activity>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-activities')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }

}
