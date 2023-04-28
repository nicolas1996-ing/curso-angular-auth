import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RefreshTokenService } from '@services/refresh-token.service';
import { TokenCookiesService } from '../services/token-cookies.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectsGuard implements CanActivate {
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

    if (isValidToken) {
      this.router.navigate(['/app']);
      return false;
    }
    return true;
  }
}
