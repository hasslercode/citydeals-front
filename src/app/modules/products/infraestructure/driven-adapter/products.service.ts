import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/api.constants';
import { ProductsGateway } from '../../domain/gateway/products.gateway';
import { PricedProductsByCategory } from '../../domain/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ProductsGateway {

  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) {
    super();
  }

  getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]> {
    return this.http.get<PricedProductsByCategory[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }
}
