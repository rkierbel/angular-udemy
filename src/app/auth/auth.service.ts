import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user-model";
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app-reducer';
import * as fromAuthActions from './store/auth-actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  // user = new BehaviorSubject<User>(null);
  tokenExpTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
      tap(resData => this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
      tap(resData => this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errMessage = 'An unknown error occurred.';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMessage);
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
    return throwError(errMessage);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000); //because milliseconds
    const user = new User(email, userId, token, expDate);
    this.store.dispatch(new fromAuthActions.Authenticate({
      email: email,
      userId: userId,
      token: token,
      expirationDate: expDate
    }));

    // this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logOut() {
    this.store.dispatch(new fromAuthActions.Logout());
    // this.user.next(null);
    // this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
    this.tokenExpTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } =     // @ts-ignore
      JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loggedinUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loggedinUser.token) {
      this.store.dispatch(new fromAuthActions.Authenticate({
        email: loggedinUser.email,
        userId: loggedinUser.id,
        token: loggedinUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));
      // this.user.next(loggedinUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); // future date minus current date in ms
      this.autoLogout(expDuration);
    }
  }

  autoLogout(expDuration: number) {
    console.log(expDuration);
    this.tokenExpTimer = setTimeout(() => {
      this.logOut();
    }, expDuration);
  }
}
