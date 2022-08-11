import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {exhaustMap, Observable, take} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.user.pipe(
      take(1),
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
