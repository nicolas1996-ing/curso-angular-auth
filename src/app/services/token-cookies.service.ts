import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenCookiesService {
  constructor() {}

  saveTokenInCookie(token: string) {
    // expires  : expira en 365 dias
    // path: '/': disponible en todas las rutas de la app
    setCookie('token-trello-cookie', token, { expires: 365, path: '/' });
  }

  getTokenCookie() {
    return getCookie('token-trello-cookie');
  }

  removeTokenCookie() {
    removeCookie('token-trello-cookie');
  }

  isValidToken() {
    const token = this.getTokenCookie();
    if (!token) {
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime(); // comparacion de fechas
    }

    return false;
  }
}
