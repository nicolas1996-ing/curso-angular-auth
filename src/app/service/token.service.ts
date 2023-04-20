/* persistir token */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveTokenInLS(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenLS() {
    return localStorage.getItem('token');
  }

  removeTokenLS() {
    localStorage.removeItem('token');
  }
}
