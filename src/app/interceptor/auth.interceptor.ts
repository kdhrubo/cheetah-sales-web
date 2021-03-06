import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services/auth.service';
import { AuthJwt } from '../models/auth.model';

export const AUTH_REQUIRED_ENDPOINTS = [
  '/leads',
  '/accounts',
  '/emailaddresses',
  '/postal',
  '/contacts',
  '/forms',
  '/activities',
  '/notes',
  '/tasks',
  '/links',
  '/picklists',
  '/phones',
  '/deals',
  '/tenant',
  '/docs',
  '/category',
  '/products',
  '/pricebooks',
  '/product-price',
  '/currencies',
  '/users',
  '/charge'
];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private helperService = new JwtHelperService();

  constructor(private authService: AuthService,
              private router: Router) {


  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Inside interceptor' + req.url) ;
    const authJwt = this.authService.authJwt;

    // console.log('Auth - ' + authJwt) ;

    if (!!authJwt && AUTH_REQUIRED_ENDPOINTS.find(data => req.url.includes(data))) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getToken(authJwt)}`
        }
      });
    }

    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 401) {
            this.authService.logout();
          }
          return throwError(err.error);
        }));
  }

  private getToken(authJwt: AuthJwt): string {
    if (!this.helperService.isTokenExpired(authJwt.access_token)) {
      return authJwt.access_token;
    } else if (!this.helperService.isTokenExpired(authJwt.refresh_token)) {
      this.authService.refreshAccessToken();
      return authJwt.refresh_token;
    }

    this.authService.logout();
    this.router.navigate(['auth']); // head to login

    throw new Error('Session Invalid: Authentication tokens has expired');
  }
}
