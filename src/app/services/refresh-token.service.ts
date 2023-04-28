import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor() {}
  saveRefreshTokenInCookie(token: string) {
    // expires  : expira en 365 dias
    // path: '/': disponible en todas las rutas de la app
    setCookie('refresh-token-trello-cookie', token, {
      expires: 365,
      path: '/',
    });
  }

  getRefresTokenCookie() {
    return getCookie('refresh-token-trello-cookie');
  }

  removeRefresTokenCookie() {
    removeCookie('refresh-token-trello-cookie');
  }

  isValidRefreshToken() {
    const refreshToken = this.getRefresTokenCookie();
    if (!refreshToken) {
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(refreshToken);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime(); // comparacion de fechas
    }

    return false;
  }
}
