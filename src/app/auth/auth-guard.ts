import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import * as fromApp from '../store/app-reducer';
import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      map(user => {
        const isAuth = !!user;
        if (isAuth) return true;
        else return this.router.createUrlTree(['/auth']);
        // !!user converts a true-ish value (anything not null or undefined) to a false boolean => and further to true
        // !!user converts a false-ish value (anything null or undefined) to a true boolean => and further to false
      }),
      /*tap(isAuth => {
        if (!isAuth)
          this.router.navigate(['auth']);
      })*/);
  }

}
