import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryGateway } from '../../domain/gateway/category.gateway';
import { ListCategory } from '../../domain/model/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CategoryGateway {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
    super();
  }

  // Implementación del método para obtener la lista de categorías
  getListCategories(): Observable<ListCategory[]> {
    return this.http.get<ListCategory[]>(`${this.baseUrl}/categories`);
  }
}
