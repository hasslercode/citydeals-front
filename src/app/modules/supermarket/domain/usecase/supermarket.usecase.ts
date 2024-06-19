// src/app/domain/usecases/supermarket.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupermarketGateway } from '../gateway/supermarket.gateway';
import { ListSupermarket } from '../model/supermarket.model';

@Injectable({
  providedIn: 'root',
})
export class SupermarketUseCase {
  constructor(private supermarketGateway: SupermarketGateway) {}

  getListSupermarket(): Observable<ListSupermarket[]> {
    return this.supermarketGateway.getSupermarkets();
  }

  create(newItem: ListSupermarket): Observable<any> {
    return this.supermarketGateway.create(newItem);
  }

}
