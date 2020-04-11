import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('Checking auth guard --->' + this.authService.isAuthenticated());

    if (this.authService.isAuthenticated()) {
      return true;
    }

    console.log('going to sigin');

    return this.router.navigate(['auth'], {queryParams: {returnUrl: state.url}});
  }


}
