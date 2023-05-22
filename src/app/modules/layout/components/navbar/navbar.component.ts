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
import { SharedService } from '@services/shared.service';
import { Colors } from '@models/color.model';
import { BACKGROUNDSNAVBAR } from '../../../../models/color.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreteBoard = false;
  $currentUser = this.authService.user$; // la subscription al observable se hace en el tamplate

  navBackgroundColor: Colors = 'sky';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenCookieService: TokenCookiesService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.subscribeToGetBackgrouundColor();
  }

  subscribeToGetBackgrouundColor() {
    this.sharedService.backgroundColor$.subscribe((bgColor) => {
      this.navBackgroundColor = bgColor;
      console.log(this.navBackgroundColor);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isValidToken() {
    const isTokenValid = this.tokenCookieService.isValidToken();
    // console.log(isTokenValid);
  }

  closeOverlayFromSon(ev: boolean) {
    this.isOpenOverlayCreteBoard = ev;
  }

  get getNavBgColor() {
    return BACKGROUNDSNAVBAR[this.navBackgroundColor] || 'sky'
  }

  get btnColor(){
    return this.navBackgroundColor
  }
}
