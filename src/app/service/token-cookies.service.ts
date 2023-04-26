import { Injectable } from '@angular/core';
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
}
