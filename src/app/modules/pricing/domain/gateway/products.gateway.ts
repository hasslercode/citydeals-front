import { Observable } from 'rxjs';
import { PricedProductsByCategory } from '../model/product.model';

export abstract class ProductsGateway {
  abstract getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]>;
}
