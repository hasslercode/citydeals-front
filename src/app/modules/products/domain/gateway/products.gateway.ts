import { Observable } from 'rxjs';
import { ListProduct, PricedProductsByCategory } from '../model/product.model';

export abstract class ProductsGateway {

  abstract getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]>;
  abstract getProductsByCategory(categoryId: number): Observable<ListProduct[]>;
  abstract getAllProducts(): Observable<ListProduct[]>;
  abstract getAllProducts(): Observable<ListProduct[]>;
  abstract createNewProduct(newProduct: ListProduct): Observable<any>;
}
