import { Component, OnInit } from '@angular/core';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { SEARCH_PRICING_PRODUCT_FORM } from '../utils/pricing-fields';
import { LIST_PRODUCTS_WITH_PRICING_MOCK } from 'src/app/shared/mocks/products/products-mock';
import {
  PricedProductsByCategory,
  Product,
} from 'src/app/modules/products/domain/model/product.model';
import { ListCategory } from 'src/app/modules/category/domain/model/category.model';
import { CategoryUseCase } from 'src/app/modules/category/domain/usecase/category.usecase';
import { ProductsUsecase } from 'src/app/modules/products/domain/usecase/products.usecase';
import { DEFAULT_IMAGE } from 'src/app/shared/interfaces/responses';


@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.scss'],
})
export class CompareProductsComponent implements OnInit {
  formData: FormDataFormat = SEARCH_PRICING_PRODUCT_FORM;
  listPricingProducts: PricedProductsByCategory[] = [];
  categories: ListCategory[] = [];
  defaultImage: string = DEFAULT_IMAGE;
  showCategories = true;
  constructor(
    private router: Router,
    private categoryUsecase: CategoryUseCase,
    private productUsecase: ProductsUsecase
  ) {}

  loadCategories(): void {
    this.categoryUsecase.getListCategories().subscribe(
      (categories: ListCategory[]) => {
        this.categories = categories.map(category => ({
          ...category,
          image: category.image || this.defaultImage
        }));
        console.log('Categories loaded successfully:', categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  searchPricingProduct(data: any) {
    const { productName } = data;
    if (productName && productName.trim() !== '') {
      console.log('productName:', productName);
    }
  }

  handleCategoryClick(category: ListCategory): void {
    this.showCategories = false;
    this.productUsecase.getPricedProductsByCategory(category.id).subscribe(
      (products: PricedProductsByCategory[]) => {
        this.listPricingProducts = products;
        console.log('Products loaded successfully:', products);
      },
      (error: any) => {
        console.error('Error loading Products:', error);
      }
    );
  }

  handleAccept(event: any) {
    // Lógica para manejar el evento de aceptar en el modal
  }

  redirectToCreatePricingProduct() {
    this.router.navigate(['pricing/update']);
  }
}
