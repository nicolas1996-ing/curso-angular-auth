import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, switchMap, tap, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { loginResponse } from '../models/auth.model';
import { TokenCookiesService } from './token-cookies.service';
import { User } from '../models/user.model';
import { checkToken } from '@interceptors/token.interceptor';
import { RefreshTokenService } from './refresh-token.service';
// configuracion de shortcuts (@env..) : /Users/nicolasaristizabal/Desktop/somos/ng/curso-angular-auth/tsconfig.json

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = `${environment.API_URL}/auth`;
  user$ = new BehaviorSubject<User | null>(null); // variable para guardar el perfil del usuario de forma global

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private tokenCookieService: TokenCookiesService,
    private refreshTokenService: RefreshTokenService
  ) {}

  login(email: string, password: string): Observable<loginResponse> {
    return (
      this.httpClient
        .post<loginResponse>(`${this.API_URL}/login`, { email, password })
        // .pipe(tap((res) => this.tokenService.saveTokenInLS(res.access_token)));
        .pipe(
          tap((res) => {
            this.refreshTokenService.saveRefreshTokenInCookie(
              res.refresh_token
            );
            this.tokenCookieService.saveTokenInCookie(res.access_token);
          })
        )
    );
  }

  logout() {
    this.tokenCookieService.removeTokenCookie();
  }

  register(email: string, password: string, name: string) {
    return this.httpClient.post(`${this.API_URL}/register`, {
      email,
      password,
      name,
    });
  }

  registerAndLogin(email: string, password: string, name: string) {
    return this.httpClient
      .post(`${this.API_URL}/register`, {
        email,
        password,
        name,
      })
      .pipe(
        switchMap((_) => this.login(email, password)),
        // tap((res) => this.tokenService.saveTokenInLS(res.access_token))
        tap((res) =>
          this.tokenCookieService.saveTokenInCookie(res.access_token)
        )
      );
  }

  isAvailable(email: string): Observable<{ isAvailable: Boolean }> {
    return this.httpClient.post<{ isAvailable: Boolean }>(
      `${this.API_URL}/is-available`,
      { email }
    );
  }

  recoveryPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/recovery`, { email });
  }

  changePassword(token: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/change-password`, {
      newPassword,
      token,
    });
  }

  getProfile(): Observable<User> {
    return this.httpClient
      .get<User>(`${this.API_URL}/profile`, {
        context: checkToken(),
      })
      .pipe(tap((userProfile) => this.user$.next(userProfile)));

    // context: checkToken() => relacionado con el interceptor
  }

  getDataUser() {
    return this.user$.getValue();
  }

  // extender la sesion del usuario ...
  refreshToken(refreshToken: string) {
    return this.httpClient
      .post<any>(`${this.API_URL}/refresh-token`, {
        refreshToken,
      })
      .pipe(
        tap((res) => {
          this.refreshTokenService.saveRefreshTokenInCookie(res.refresh_token);
          this.tokenCookieService.saveTokenInCookie(res.access_token);
        })
      );
  }
}

/*
  --- token agregado directamente en los headers del request ---
  getProfile(): Observable<User> {
    const token = this.tokenCookieService.getTokenCookie();
    return this.httpClient
      .get<User>(`${this.API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(tap((userProfile) => this.user$.next(userProfile)));
  }
*/
