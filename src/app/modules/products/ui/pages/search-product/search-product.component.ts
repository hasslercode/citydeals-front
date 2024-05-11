import { Component } from '@angular/core';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { SEARCH_PRODUCT_FORM } from '../../utils/product-fields';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {

  formData: FormDataFormat = SEARCH_PRODUCT_FORM;

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

  redirectToCreateProduct() {
    this.router.navigate(['products/create']);
  }

}
