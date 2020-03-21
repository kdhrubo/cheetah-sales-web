import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed = true;

  authenticated$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authenticated$ = this.authService.isLoggedIn;

    console.log('authenticated' + this.authenticated$);
  }

}
