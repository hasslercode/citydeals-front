// src/app/infrastructure/services/price-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PricingGateway } from '../../domain/gateway/pricing.gateway';
import { UpdatePrice } from '../../domain/model/pricing.model';
import { API_URL } from 'src/app/core/api.constants';

@Injectable({
  providedIn: 'root',
})
export class PricingService extends PricingGateway {

  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) {
    super();
  }

  updatePriceHistory(data: UpdatePrice): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/price-histories`, data);
  }

  updateMultiplePrice(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/price-histories/multiple`, data);
  }

}
