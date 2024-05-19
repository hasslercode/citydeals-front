import { Component, OnInit } from '@angular/core';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { SEARCH_PRODUCT_FORM } from '../../utils/product-fields';
import { Router } from '@angular/router';
import { LIST_PRODUCTS_MOCK } from 'src/app/shared/mocks/products/products-mock';
import { ListProduct, Product } from '../../../domain/model/product.model';
import { ProductsUsecase } from '../../../domain/usecase/products.usecase';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  formData: FormDataFormat = SEARCH_PRODUCT_FORM;
  listProducts: ListProduct[] = []

  constructor(private router: Router,
    private productUsecase: ProductsUsecase,
  ) {}

  ngOnInit(): void {
      this.loadProducts();
  }

  searchProduct(data: any) {
    const { productName } = data;
    if (productName && productName.trim() !== '') {
      console.log('productName:', productName);
    }
  }

  loadProducts(): void {
    this.productUsecase.getAllProducts().subscribe(
      (products: ListProduct[]) => {
        this.listProducts = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  handleAccept(event: any) {
    // Lógica para manejar el evento de aceptar en el modal
  }

  onEditProduct(product: ListProduct) {
     console.log("Nueva info de producto", product);
  }

  redirectToCreateProduct() {
    this.router.navigate(['products/create']);
  }

}
