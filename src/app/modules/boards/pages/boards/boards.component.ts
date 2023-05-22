import { Component, OnInit } from '@angular/core';
import {
  faBox,
  faWaveSquare,
  faClock,
  faAngleUp,
  faAngleDown,
  faHeart,
  faBorderAll,
  faUsers,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { SharedService } from '@services/shared.service';
import { Board } from '../../../../models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit {
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  boards: Board[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getMyBoards();
    // this.sharedService.setBackgroundColor('sky')
  }

  getMyBoards() {
    this.sharedService.getMeBoards().subscribe({
      next: (boards) => {
        // console.log(boards);
        this.boards = boards;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
