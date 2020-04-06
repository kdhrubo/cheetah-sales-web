import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Base64 } from 'js-base64';

import {
  User,
  AuthJwt,
  SignUpRequest,
  ForgotPwdRequest
} from '../models/auth.model';

import { environment } from '../../environments/environment';

export const CURRENT_USER_KEY = 'currentUser';
export const USER_CREDENTIALS_KEY = 'userCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helperService = new JwtHelperService();
  // tslint:disable-next-line: variable-name
  private _authJwt: AuthJwt;
  private user: User;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getToken() {

    return localStorage.getItem(CURRENT_USER_KEY);

  }

  fakeSignin() {
    this.loggedIn.next(true);
  }

  getTenant() {
    //console.log('R Token - ' + this._authJwt?.refresh_token);
    console.log('A Token - ' + this._authJwt?.access_token);
    const token = this.helperService.decodeToken(this._authJwt?.access_token);

    // tslint:disable-next-line: no-unused-expression
    const tenantId = token?.tenantId;

    console.log('tenant id -> ' + tenantId);

    return tenantId;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get authJwt(): AuthJwt {
    return this._authJwt;
  }

  isAuthenticated(): boolean {
    return (
      !!this._authJwt &&
      !this.helperService.isTokenExpired(this._authJwt.refresh_token)
    );
  }

  signin(email: string, passcode: string): Observable<boolean> {
    const request = `username=${email}&password=${passcode}`;
    const url = `${environment.auth_base_url}/oauth/token?grant_type=password&${request}`;
    return this.httpClient.post(url, null, this.getOptions()).pipe(
      map((res: AuthJwt) => {
        this._authJwt = res;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res));
        this.loggedIn.next(true);
        return true;
      }),
      catchError(err => this.handleError(err, 'register'))
    );
  }

  signup(signUpRequest: SignUpRequest): Observable<any> {
    const url = `${environment.api_base_url}/users/register`;
    return this.httpClient
      .post<Observable<any>>(url, signUpRequest)
      .pipe(catchError(err => this.handleError(err, 'register')));
  }

  whoAmI(): Observable<User> {
    const url = `${environment.api_base_url}/users/whoami/`;

    return this.httpClient.get(url).pipe(
      map((u: User) => {
        this.user = u;
        return u;
      }),
      catchError(err => this.handleError(err, 'register'))
    );
  }

  getUser(): User {
    if (this.user == null) {
      this.user = new User();
      this.user.id = this.helperService.decodeToken(
        this._authJwt.access_token
      ).user_id;
    }
    return this.user;
  }

  sendOtp(email: string): Observable<any> {
    const url = `${environment.auth_base_url}/users/otp/` + email;
    return this.httpClient
      .post<Observable<any>>(url, {})
      .pipe(catchError(err => this.handleError(err, 'send-otp')));
  }

  updatePassword(forgotPwdRequest: ForgotPwdRequest): Observable<any> {
    const url = `${environment.api_base_url}/users/changepassword`;
    return this.httpClient
      .post<Observable<any>>(url, forgotPwdRequest)
      .pipe(catchError(err => this.handleError(err, 'changepassword')));
  }

  refreshAccessToken() {
    const body: FormData = new FormData();
    body.append('refresh_token', this._authJwt.refresh_token);
    const url = `${environment.api_base_url}/oauth/token?grant_type=refresh_token`;
    this.httpClient
      .post(url, body, this.getOptions())
      .subscribe((res: AuthJwt) => {
        this._authJwt = res;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(res));
      });
  }

  logout(): void {
    console.log('----- logout called ----');
    localStorage.removeItem(CURRENT_USER_KEY);
    this.loggedIn.next(false);
    this._authJwt = null;
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Base64.encode(
            `${environment.oauth_client_id}:${environment.oauth_client_secret}`
          )
      })
    };
  }

  private handleError(error: any, methodName: string) {
    const message = !!error.detail ? error.detail : 'Please try again.';
    console.log('Error in ', methodName, '\n', error);

    return throwError(message);
  }
}
