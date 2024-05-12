import { Component } from '@angular/core';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { SEARCH_PRICING_PRODUCT_FORM } from '../utils/pricing-fields';
import { LIST_PRODUCTS_WITH_PRICING_MOCK } from 'src/app/shared/mocks/products/products-mock';
import { Product } from 'src/app/modules/products/domain/model/product.model';



@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.scss']
})
export class CompareProductsComponent {

  formData: FormDataFormat = SEARCH_PRICING_PRODUCT_FORM;
  listPricingProducts: Product[] = LIST_PRODUCTS_WITH_PRICING_MOCK;

  constructor(private router: Router) {
    console.log(this.listPricingProducts);

  }

  searchPricingProduct(data: any) {
    const { productName } = data;
    if (productName && productName.trim() !== '') {
      console.log('productName:', productName);
    }
  }

  handleAccept(event: any) {
    // Lógica para manejar el evento de aceptar en el modal
  }

  redirectToCreatePricingProduct() {
    this.router.navigate(['pricing/update']);
  }

}
