// src/app/domain/gateways/price-history.gateway.ts
import { Observable } from 'rxjs';
import { UpdatePrice } from '../model/pricing.model';

export abstract class PricingGateway {
  abstract updatePriceHistory(data: UpdatePrice): Observable<any>;
}
