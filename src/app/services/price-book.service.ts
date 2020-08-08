import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page.model';
import { PriceBook } from '../models/price-book.model';

@Injectable({
  providedIn: 'root'
})
export class PriceBookService {

  constructor(private httpClient: HttpClient) { }

  save(deal: any): Observable<any> {
    const url = `${environment.api_base_url}/pricebooks`;
    return this.httpClient
      .post<Observable<any>>(url, deal)
      .pipe(catchError(err => this.handleError(err, 'Error reorted while saving price book')));
  }

  //TODO: will be used for import deals
  saveAll(priceBooks: PriceBook[]): Observable<any> {
    const url = `${environment.api_base_url}/pricebooks/import`;
    const data = { 'priceBooks': priceBooks };
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-pricce book')));

  }

  copy(id: any): Observable<any> {
    const url = `${environment.api_base_url}/pricebooks/copy/${id}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'copy-price book')));
  }


  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<PriceBook>> {
    const url = `${environment.api_base_url}/pricebooks/search?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;
    console.log('url - ' + url);

    return this.httpClient
      .get<Page<PriceBook>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-price book')));
  }

  findOne(id: string): Observable<PriceBook> {
    const url = `${environment.api_base_url}/pricebooks/findOne/` + id;
    return this.httpClient
      .get<PriceBook>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-pricebook')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);
    return throwError(message);
  }

  addProduct(id: any, product: any): Observable<any> {
    const url = `${environment.api_base_url}/pricebooks/${id}/products`;
    return this.httpClient
      .post<Observable<any>>(url, product)
      .pipe(catchError(err => this.handleError(err, 'add-pricebooks-product')));
  }

  removeProduct(id: any, productId: any): Observable<any> {
    const url = `${environment.api_base_url}/pricebooks/${id}/products/${productId}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'renove-pricebooks-product')));
  }
}
