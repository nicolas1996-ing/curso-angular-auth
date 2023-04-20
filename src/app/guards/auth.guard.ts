// ng g g guards/auth --skip-tests
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokeService: TokenService, private router: Router) {}

  canActivate() {
    const token = this.tokeService.getTokenLS();

    if (!token) {
      this.router.navigate(['login']);
      return !!token;
    }
    return !!token;
  }
}
