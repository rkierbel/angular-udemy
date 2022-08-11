import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface authResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<authResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlASwIhi0Ld-5t3KfQxz3BNIzdK-_thIg',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
