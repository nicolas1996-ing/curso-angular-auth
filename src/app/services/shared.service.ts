import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@interceptors/token.interceptor';
import { Board, GetBoardDetail } from '@models/board.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Card, List } from '../models/board.model';
import { Colors } from '../models/color.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  URL_BASE = environment.API_URL;
  constructor(private httpClient: HttpClient) {}
  BUFFER_SPACE = 65536;
  backgroundColor$ = new BehaviorSubject<Colors>('sky');

  getMeBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`${this.URL_BASE}/me/boards`, {
      context: checkToken(),
    });
  }

  getBoardDetail(id: string): Observable<GetBoardDetail> {
    return this.httpClient
      .get<GetBoardDetail>(`${this.URL_BASE}/boards/${id}`, {
        context: checkToken(),
      })
      // .pipe(
      //   tap((res) => {
      //     this.setBackgroundColor(res.backgroundColor);
      //   })
      // );
  }

  getPosition(cards: Card[], currentIdx: number) {
    // console.log(cards.length, currentIdx);

    if (cards.length === 1) {
      return { message: 'is new', position: this.BUFFER_SPACE };
    }

    if (cards.length > 1 && currentIdx === 0) {
      const onToPosition = cards[1].position; // card[1] previo al mov estaba mas arriba
      return { message: 'is in the top', position: onToPosition / 2 };
    }

    const lastIdx = cards.length - 1;
    if (cards.length > 2 && currentIdx > 0 && currentIdx < lastIdx) {
      const previousPosition = cards[currentIdx - 1].position; // una posicion mas arriba del previo mov
      const nextPosition = cards[currentIdx + 1].position; // una posicion mas abajo del previo mov
      const prom = (previousPosition + nextPosition) / 2;
      return { message: 'is in the middle', position: prom };
    }

    if (cards.length > 1 && currentIdx === lastIdx) {
      const lastPosition = cards[lastIdx].position;
      return {
        mesage: 'is in the bottom',
        position: lastPosition + this.BUFFER_SPACE,
      };
    }

    return {
      message: 'error',
      position: 0,
    };
  }

  getPositionNewItem(elements: Card[] | List[]) {
    const lastIdx = elements.length - 1;

    if (elements.length === 0) {
      return this.BUFFER_SPACE;
    }
    return elements[lastIdx].position + this.BUFFER_SPACE + 1;
  }

  createBoard(title: string, backgroundColor: Colors): Observable<Board> {
    return this.httpClient.post<Board>(
      `${this.URL_BASE}/boards`,
      { title, backgroundColor },
      { context: checkToken() }
    );
  }

  // manejo del estado
  setBackgroundColor(color: Colors) {
    this.backgroundColor$.next(color);
  }
}
