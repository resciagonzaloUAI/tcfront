import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';
import { Credentials } from '../types/Credentials';
import { JTWResponse } from '../types/JTWResponse';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { noop, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any> {
  constructor(httpClient: HttpClient, private readonly router: Router) {
    super(httpClient, 'auth');
  }

  login(credentials: Credentials) {
    console.log('asd', credentials);

    this.http
      .post(`${this.API_SERVER}/${this.endpoint}/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
            return true;
          }
          return false;
        })
      )
      .subscribe(noop);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    window.location.reload();
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const decodedToken = jwt_decode(token) as any;
    if (!decodedToken.exp) return true;

    // Token expiry date is in seconds
    const date = new Date(0);
    let tokenExpDate = date.setUTCSeconds(decodedToken.exp);

    if (tokenExpDate.valueOf() > new Date().valueOf()) {
      return false;
    }
    return true;
  }

  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }
}
