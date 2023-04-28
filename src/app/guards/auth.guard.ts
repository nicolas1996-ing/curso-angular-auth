// ng g g guards/auth --skip-tests
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { TokenCookiesService } from '../services/token-cookies.service';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /* token almacenado en una cookie */
  constructor(
    private tokenCookiesService: TokenCookiesService,
    private refreshTokenSerivce: RefreshTokenService,
    private router: Router
  ) {}

  canActivate() {
    // sesion dura lo que dure el access token
    // const isValidToken = this.tokenCookiesService.isValidToken();

    // sesion dura lo que dure el refresh token
    const isValidToken = this.refreshTokenSerivce.isValidRefreshToken();

    if (!isValidToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  // token service: token almacenado en localstorage
  /* 
  constructor(private tokeService: TokenService, private router: Router) {}

  canActivate() {
    const token = this.tokeService.getTokenLS();

    if (!token) {
      this.router.navigate(['login']);
      return !!token;
    }
    return !!token;
  }
  */
}
