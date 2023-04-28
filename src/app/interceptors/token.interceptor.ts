import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenCookiesService } from '../services/token-cookies.service';
import { AuthService } from '@services/auth.service';
import { RefreshTokenService } from '../services/refresh-token.service';

// context
const CHECK_TOKEN = new HttpContextToken<Boolean>(() => false);
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenCookieService: TokenCookiesService,
    private refreshToken: RefreshTokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add context
    if (request.context.get(CHECK_TOKEN)) {
      const isValidToken = this.tokenCookieService.isValidToken(); // access token

      if (isValidToken) {
        return this.addToken(request, next);
      } else {
        // intenta generar un nuevo token y agregarlo al request 
        return this.updateAccessTokenAndRefreshToken(request, next);
      }
    }
    return next.handle(request); // se envia la peticion http normalmente
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accessToken = this.tokenCookieService.getTokenCookie();
    if (accessToken) {
      // clone and add header to the http request
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private updateAccessTokenAndRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    const refreshToken = this.refreshToken.getRefresTokenCookie();
    const isValidRefreshToken = this.refreshToken.isValidRefreshToken();

    if (refreshToken && isValidRefreshToken) {
      return this.authService
        .refreshToken(refreshToken) // solicitar nuevo token and refresh token
        .pipe(switchMap(() => this.addToken(request, next)));
    }
    return next.handle(request);
  }
}
