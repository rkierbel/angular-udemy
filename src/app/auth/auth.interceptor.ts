import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {exhaustMap, map, Observable, take} from 'rxjs';
import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app-reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) return next.handle(request);
        const reqClone = request.clone({
          // @ts-ignore
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(reqClone);
      }));
  }
}
