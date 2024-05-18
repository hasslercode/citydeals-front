import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PricedProductsByCategory } from '../model/product.model';
import { ProductsGateway } from '../gateway/products.gateway';

@Injectable({
  providedIn: 'root',
})
export class ProductsUsecase {
  constructor(private discountsGateway: ProductsGateway) {}

  getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]> {
    return this.discountsGateway.getPricedProductsByCategory(categoryId);
  }
}
