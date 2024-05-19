import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListProduct, PricedProductsByCategory } from '../model/product.model';
import { ProductsGateway } from '../gateway/products.gateway';

@Injectable({
  providedIn: 'root',
})
export class ProductsUsecase {
  constructor(private discountsGateway: ProductsGateway) {}

  getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]> {
    return this.discountsGateway.getPricedProductsByCategory(categoryId);
  }

  getProductsByCategory(categoryId: number): Observable<ListProduct[]>{
    return this.discountsGateway.getProductsByCategory(categoryId);
  }
  getAllProducts(): Observable<ListProduct[]>{
    return this.discountsGateway.getAllProducts();
  }

  createNewProduct(newProduct: ListProduct): Observable<any> {
    return this.discountsGateway.createNewProduct(newProduct);
  }

}
