import { Observable } from 'rxjs';
import { ListCategory } from '../model/category.model';

export abstract class CategoryGateway {
  abstract getListCategories(): Observable<ListCategory[]>;
}
