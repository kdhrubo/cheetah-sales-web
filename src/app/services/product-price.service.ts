import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page.model';
import { ProductPrice } from '../models/product-price/product-price.model';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {


  constructor(private httpClient: HttpClient) { }

  save(deal: any): Observable<any> {
    const url = `${environment.api_base_url}/product-price`;
    return this.httpClient
      .post<Observable<any>>(url, deal)
      .pipe(catchError(err => this.handleError(err, 'Error reorted while saving product price')));
  }

  //TODO: will be used for import productPrices
  saveAll(productPrices: ProductPrice[]): Observable<any> {
    const url = `${environment.api_base_url}/product-price/import`;
    const data = { 'productPrices': productPrices };
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-Product Prices')));

  }

  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<ProductPrice>> {
    const url = `${environment.api_base_url}/product-price/search?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;
    console.log('url - ' + url);

    return this.httpClient
      .get<Page<ProductPrice>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-product price')));
  }

  findOne(id: string): Observable<ProductPrice> {
    const url = `${environment.api_base_url}/product-price/findOne/` + id;
    return this.httpClient
      .get<ProductPrice>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-product price')));
  }



  copy(id: any): Observable<any> {
    const url = `${environment.api_base_url}/product-price/copy/${id}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'copy-price book')));
  }



  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);
    return throwError(message);
  }
}
