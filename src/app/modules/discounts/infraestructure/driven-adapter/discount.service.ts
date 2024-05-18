import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscountsGateway } from '../../domain/gateway/discounts.gateway';
import { DiscountsToday, NewDiscount } from '../../domain/model/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService extends DiscountsGateway {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
    super();
  }

  getDiscountsToday(): Observable<DiscountsToday[]> {
    const url = `${this.baseUrl}/discounts/today`;
    return this.http.get<DiscountsToday[]>(url);
  }

  createNewDiscount(newDiscount: NewDiscount): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/discounts`, newDiscount);
  }
}
