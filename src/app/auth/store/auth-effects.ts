import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "../store/auth-actions";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (expiresIn: number, email: string, userId: string, token: string): AuthActions.AuthActions => {
  const expDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new AuthActions.Authenticate({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expDate
  });
}

const handleErr = (errorRes: any): Observable<any> => {
  let errMessage = 'An unknown error occurred.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFail(errMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errMessage = 'This email already exists.';
      break;
    case 'EMAIL_NOT_FOUND':
      errMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errMessage = 'The password is invalid.';
      break;
  }
  return of(new AuthActions.AuthFail(errMessage));
}

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }).pipe(map(resData => {
          return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
        }), catchError(errorRes => {
          return handleErr(errorRes);
        })
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.AUTH_START),
    switchMap((authData: AuthActions.AuthStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(map(resData => {
          return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
        }), catchError(errorRes => {
          return handleErr(errorRes);
        })
      );
    }),
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE, AuthActions.LOGOUT),
    tap(() => this.router.navigate(['/']))
  ); // will not dispatch a new action

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }

}
