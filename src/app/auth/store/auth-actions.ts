import {Action} from "@ngrx/store";

export const AUTHENTICATE = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_START = '[auth] LOGIN_START';
export const AUTH_FAIL = '[auth] LOGIN_FAIL';
export const SIGN_UP_START = '[auth] SIGN_UP_START';
export const CLEAR_ERR = '[auth] CLEAR_ERROR';

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date}) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthStart implements Action {
  readonly type = AUTH_START;

  constructor(public payload : {
    email: string,
    password: string
  }) {
  }

}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {

  }
}

export class SignUpStart implements Action {
  readonly  type = SIGN_UP_START;

  constructor(public  payload: {email: string, password: string}) {
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERR;

}

export type AuthActions  = Authenticate | Logout | AuthStart | AuthFail | SignUpStart | ClearError;
