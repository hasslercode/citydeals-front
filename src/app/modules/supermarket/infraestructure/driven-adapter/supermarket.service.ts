// src/app/infrastructure/services/supermarket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/api.constants';
import { SupermarketGateway } from '../../domain/gateway/supermarket.gateway';
import { ListSupermarket } from '../../domain/model/supermarket.model';

@Injectable({
  providedIn: 'root',
})
export class SupermarketService extends SupermarketGateway {
  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) {
    super();
  }

  getSupermarkets(): Observable<ListSupermarket[]> {
    return this.http.get<ListSupermarket[]>(`${this.apiUrl}/supermarkets`);
  }

  create(newItem: ListSupermarket): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/supermarkets`, newItem);
  }
}
