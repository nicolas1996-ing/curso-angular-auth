// ng g g guards/auth --skip-tests
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
import { TokenCookiesService } from '../service/token-cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /* token almacenado en una cookie */
  constructor(
    private tokenCookiesService: TokenCookiesService,
    private router: Router
  ) {}

  canActivate() {
    const token = this.tokenCookiesService.getTokenCookie();

    if (!token) {
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
