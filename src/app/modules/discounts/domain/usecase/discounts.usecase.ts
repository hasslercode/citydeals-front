import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountsGateway } from '../gateway/discounts.gateway';
import { DiscountsToday, NewDiscount } from '../model/discount.model';

@Injectable({
  providedIn: 'root',
})
export class DiscountsUsecase {
  constructor(private discountsGateway: DiscountsGateway) {}

  getDiscountsToday(): Observable<DiscountsToday[]> {
    return this.discountsGateway.getDiscountsToday();
  }

  createNewDiscount(newDiscount: NewDiscount): Observable<any> {
    return this.discountsGateway.createNewDiscount(newDiscount);
  }


}
