import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService} from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.auth.user$
           .take(1)
           .map(user => {
             if (!!user) {
               return(user.admin);
             }
            })
           .do(isadmin => {
             if (!isadmin) {
               console.log('access denied--not an admin');
               this.router.navigate(['/login']);
             }
         });
  }
}
