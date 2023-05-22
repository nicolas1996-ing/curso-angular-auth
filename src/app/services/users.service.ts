import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { TokenCookiesService } from './token-cookies.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  API_URL = `${environment.API_URL}/users`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private tokenCookieService: TokenCookiesService
  ) {}

  // context: checkToken() => le agrega el token al request
  getUsers(): Observable<User[]> {
    const token = this.tokenCookieService.getTokenCookie();
    return this.http.get<User[]>(`${this.API_URL}`, {
      context: checkToken(),
    });
  }
}

/*
 getUsers(): Observable<User[]> {
    const token = this.tokenCookieService.getTokenCookie();
    return this.http.get<User[]>(`${this.API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
*/
