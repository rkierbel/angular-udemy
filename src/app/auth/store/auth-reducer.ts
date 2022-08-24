import {User} from "../user-model";
import * as fromAuthAction from "./auth-actions";

export interface State {
  user: User,
  authError: string,
  loading: boolean
}

const initialState: State = {
  // @ts-ignore
  user: null,
  authError: "",
  loading: false
}

export function authReducer(state = initialState, action: fromAuthAction.AuthActions) {
  switch (action.type) {
    case fromAuthAction.AUTHENTICATE:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate);
      return {
        ...state,
        user: user, // when property and value have the same name -> can simplify by using just the prop
        loading: false
      }
    case fromAuthAction.LOGOUT:
      return {
        ...state,
        user: null,
        authError: ""
      }
    case fromAuthAction.AUTH_START:
    case fromAuthAction.SIGN_UP_START:
      return {
        ...state,
        authError: "",
        loading: true
      }
    case fromAuthAction.AUTH_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case fromAuthAction.CLEAR_ERR:
      return {
        ...state,
        authError: "",
      }
    default:
      return state;

  }
}
