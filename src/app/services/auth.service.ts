import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, switchMap, tap } from 'rxjs';
import { TokenService } from '../service/token.service';
import { loginResponse } from '../models/auth.model';
// configuracion de shortcuts (@env..) : /Users/nicolasaristizabal/Desktop/somos/ng/curso-angular-auth/tsconfig.json

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = `${environment.API_URL}/auth`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string): Observable<loginResponse> {
    return this.httpClient
      .post<loginResponse>(`${this.API_URL}/login`, { email, password })
      .pipe(tap((res) => this.tokenService.saveTokenInLS(res.access_token)));
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
        tap((res) => this.tokenService.saveTokenInLS(res.access_token))
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
}
