import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateListDto } from '@models/list.model';
import { checkToken } from '../interceptors/token.interceptor';
import { CreateListResponse } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  URL_BASE = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  createList(data: CreateListDto): Observable<CreateListResponse> {
    return this.httpClient.post<CreateListResponse>(`${this.URL_BASE}/lists`, data, {
      context: checkToken(),
    });
  }
}
