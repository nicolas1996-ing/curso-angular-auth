import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { TokenService } from '../../../../services/token.service';
import { TokenCookiesService } from '@services/token-cookies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  $currentUser = this.authService.user$; // la subscription al observable se hace en el tamplate

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenCookieService: TokenCookiesService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isValidToken() {
    const isTokenValid = this.tokenCookieService.isValidToken();
    console.log(isTokenValid);
  }
}
