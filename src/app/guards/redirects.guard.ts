import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { TokenCookiesService } from '../service/token-cookies.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectsGuard implements CanActivate {
  constructor(
    private tokenCookiesService: TokenCookiesService,
    private router: Router
  ) {}

  canActivate() {
    const token = this.tokenCookiesService.getTokenCookie();
    console.log(token)

    if (token) {
      this.router.navigate(['/app']);
      return false
    }
    return true;
  }
}
