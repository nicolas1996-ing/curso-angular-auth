import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCardDto, UpdatesCardDto } from '@models/card.model';
import { checkToken } from '../interceptors/token.interceptor';
import { Card } from '@models/board.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  URL_BASE = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  updateCard(id: string, updates: UpdatesCardDto): Observable<Card> {
    return this.httpClient.put<Card>(`${this.URL_BASE}/cards/${id}`, updates, {
      context: checkToken(),
    });
  }

  createCard(data: CreateCardDto): Observable<Card> {
    return this.httpClient.post<Card>(`${this.URL_BASE}/cards`, data, {
      context: checkToken(),
    });
  }
}
