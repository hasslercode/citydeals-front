import { Component } from '@angular/core';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { SEARCH_PRODUCT_FORM } from '../../utils/product-fields';
import { Router } from '@angular/router';
import { LIST_PRODUCTS_MOCK } from 'src/app/shared/mocks/products/products-mock';
import { Product } from '../../../domain/model/product.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {

  formData: FormDataFormat = SEARCH_PRODUCT_FORM;
  listProducts: Product[] = LIST_PRODUCTS_MOCK;

  constructor(private router: Router) {}

  searchProduct(data: any) {
    const { productName } = data;
    if (productName && productName.trim() !== '') {
      console.log('productName:', productName);
    }
  }

  handleAccept(event: any) {
    // Lógica para manejar el evento de aceptar en el modal
  }

  onEditProduct(product: Product) {
     console.log("Nueva info de producto", product);
  }

  redirectToCreateProduct() {
    this.router.navigate(['products/create']);
  }

}
