// src/app/domain/usecases/price-history.usecase.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PricingGateway } from '../gateway/pricing.gateway';
import { UpdatePrice } from '../model/pricing.model';

@Injectable({
  providedIn: 'root',
})
export class PricingUseCase {
  constructor(private priceHistoryGateway: PricingGateway) {}

  updatePriceProduct(data: UpdatePrice): Observable<any> {
    return this.priceHistoryGateway.updatePriceHistory(data);
  }
  updateMultiplePrice(data: any): Observable<any> {
    return this.priceHistoryGateway.updateMultiplePrice(data);
  }
}
