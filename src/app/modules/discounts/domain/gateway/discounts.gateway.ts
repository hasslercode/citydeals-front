import { Observable } from 'rxjs';
import { DiscountsToday, NewDiscount } from '../model/discount.model';

export abstract class DiscountsGateway {

 abstract getDiscountsToday(): Observable<DiscountsToday[]>;
 abstract createNewDiscount(newDiscount: NewDiscount): Observable<any>;
}
