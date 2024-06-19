import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryGateway } from '../gateway/category.gateway';
import { ListCategory } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryUseCase {

  constructor(private categoryGateway: CategoryGateway) { }

  // Método para obtener la lista de categorías
  getListCategories(): Observable<ListCategory[]> {
    return this.categoryGateway.getListCategories();
  }
}
