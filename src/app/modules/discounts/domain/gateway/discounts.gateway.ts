import { Observable } from 'rxjs';
import { PricedProductsByCategory } from '../model/discount.model';

export abstract class DiscountsGateway {
  abstract getPricedProductsByCategory(categoryId: number): Observable<PricedProductsByCategory[]>;
}
