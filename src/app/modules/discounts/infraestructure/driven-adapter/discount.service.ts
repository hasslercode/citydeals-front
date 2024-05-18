import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscountsGateway } from '../../domain/gateway/discounts.gateway';
import { PricedProductsByCategory } from '../../domain/model/discount.model';
import { API_URL } from '../../../../core/api.constants';

@Injectable({
  providedIn: 'root',
})
export class DiscountsService extends DiscountsGateway {

  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) {
    super();
  }

  getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]> {
    return this.http.get<PricedProductsByCategory[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }
}
