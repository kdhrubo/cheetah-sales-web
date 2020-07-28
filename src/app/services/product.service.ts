import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  save(product: any): Observable<any> {
    const url = `${environment.api_base_url}/products`;
    return this.httpClient
      .post<Observable<any>>(url, product)
      .pipe(catchError(err => this.handleError(err, 'Error reorted while saving Product')));
  }

  //TODO: will be used for import products
  saveAll(products: Product[]): Observable<any> {
    const url = `${environment.api_base_url}/products/import`;
    const data = { 'products': products };
    return this.httpClient
      .post<Observable<any>>(url, data)
      .pipe(catchError(err => this.handleError(err, 'import-products')));

  }


  search(
    rsql: string,
    pageNo: number,
    pageSize: number
  ): Observable<Page<Product>> {
    const url = `${environment.api_base_url}/products/search?rsql=${rsql}&page=${pageNo}&size=${pageSize}`;

    return this.httpClient
      .get<Page<Product>>(url)
      .pipe(catchError(err => this.handleError(err, 'find-all-search-products')));
  }

  findOne(id: string): Observable<Product> {
    const url = `${environment.api_base_url}/products/findOne/` + id;
    return this.httpClient
      .get<Product>(url)
      .pipe(catchError(err => this.handleError(err, 'find-one-product')));
  }

  delete(id: any): Observable<any>  {
    const url = `${environment.api_base_url}/products/${id}`;

    return this.httpClient
      .delete<Observable<any>>(url, {})
      .pipe(catchError(err => this.handleError(err, 'delete-product')));

  }

  copy(id: any): Observable<any> {
    const url = `${environment.api_base_url}/products/copy/${id}`;
    return this.httpClient
      .post<Observable<any>>(url, null)
      .pipe(catchError(err => this.handleError(err, 'copy-product')));
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);
    return throwError(message);
  }
}
