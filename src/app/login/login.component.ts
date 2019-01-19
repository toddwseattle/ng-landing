import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../core/auth.service';
import { IUser } from '../core/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(public as: AuthService) {
    this.user$ = as.user$;
   }
  ngOnInit() {

  }

  doLogin() {
    this.as.googleLogin();
  }
  doLogout() {
    this.as.signOut();
  }

}
