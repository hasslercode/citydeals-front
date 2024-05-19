import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/api.constants';
import { ProductsGateway } from '../../domain/gateway/products.gateway';
import { ListProduct, PricedProductsByCategory } from '../../domain/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ProductsGateway {

  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) {
    super();
  }

  getAllProducts(): Observable<ListProduct[]> {
    return this.http.get<ListProduct[]>(`${this.apiUrl}/products`);
  }

  getProductsByCategory(categoryId: number): Observable<ListProduct[]> {
    return this.http.get<ListProduct[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }

  getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]> {
    return this.http.get<PricedProductsByCategory[]>(`${this.apiUrl}/products/category/${categoryId}/prices`);
  }

  createNewProduct(newProduct: ListProduct): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, newProduct);
  }

}
