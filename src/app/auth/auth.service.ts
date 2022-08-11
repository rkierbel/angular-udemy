import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user-model";

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
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlASwIhi0Ld-5t3KfQxz3BNIzdK-_thIg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
      tap(resData => this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlASwIhi0Ld-5t3KfQxz3BNIzdK-_thIg',
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
    this.user.next(user);
  }
}
