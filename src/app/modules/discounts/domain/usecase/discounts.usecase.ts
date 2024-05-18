import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountsGateway } from '../gateway/discounts.gateway';
import { PricedProductsByCategory } from '../model/discount.model';

@Injectable({
  providedIn: 'root',
})
export class DiscountsUsecase {
  constructor(private discountsGateway: DiscountsGateway) {}

  getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]> {
    return this.discountsGateway.getPricedProductsByCategory(categoryId);
  }
}
