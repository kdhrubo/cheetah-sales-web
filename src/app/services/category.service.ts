import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  save(category: any): Observable<any> {
    const url = `${environment.api_base_url}/category`;
    return this.httpClient
      .post<Observable<any>>(url, category)
      .pipe(catchError(err => this.handleError(err, 'Error reported while saving Category')));
  }

  //TODO: will be used for import deals
  saveAll(categories: Category[]): Observable<any> {
    const url = `${environment.api_base_url}/category/import`;
    const data = { 'category': categories };
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-categories')));

  }

  delete(id: any): Observable<any>  {
    const url = `${environment.api_base_url}/categories/${id}`;

    return this.httpClient
      .delete<Observable<any>>(url, {})
      .pipe(catchError(err => this.handleError(err, 'delete-category')));

  }


  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Category>> {
    const url = `${environment.api_base_url}/category/search?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;
    console.log('url - ' + url);

    return this.httpClient
      .get<Page<Category>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-category')));
  }

  findOne(id: string): Observable<Category> {
    const url = `${environment.api_base_url}/category/findOne/` + id;
    return this.httpClient
      .get<Category>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-category')));
  }


  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);
    return throwError(message);
  }
}
