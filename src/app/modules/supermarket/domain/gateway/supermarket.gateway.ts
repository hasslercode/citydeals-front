// src/app/domain/gateways/supermarket.gateway.ts
import { Observable } from 'rxjs';
import { ListSupermarket } from '../model/supermarket.model';

export abstract class SupermarketGateway {
  abstract getSupermarkets(): Observable<ListSupermarket[]>;
}
