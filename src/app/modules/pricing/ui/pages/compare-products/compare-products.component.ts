import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';


@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.scss'],
})
export class CompareProductsComponent implements OnInit {
  @ViewChild('modal') modalInfo!: ModalComponent;

  formData: FormDataFormat = SEARCH_PRICING_PRODUCT_FORM;
  listPricingProducts: PricedProductsByCategory[] = [];
  categories: ListCategory[] = [];
  defaultImage: string = DEFAULT_IMAGE;
  showCategories = true;
  titleModal: string = '';
  subtitleModal: string = '';
  subtitleErrorModal: string = '';
  btnTextModal: string = '';
  constructor(
    private router: Router,
    private categoryUsecase: CategoryUseCase,
    private productUsecase: ProductsUsecase,
    private shoppingListService: ShoppingListService,
    private modalService: ModalService,
  ) {}


  showModal(title: string = this.titleModal, subtitle: string = this.subtitleModal, btnText: string = 'Aceptar') {
    this.setModal();
    this.modalService.showModal(
      title,
      subtitle,
      btnText
    );
  }

  private setModal() {
    this.modalService.setModal(this.modalInfo);
  }

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

  onAddToShoppingList(product: PricedProductsByCategory) {
    this.shoppingListService.addToShoppingList(product);
    this.showModal('Gestión de carrito', 'El producto se ha añadido al carrito correctamente.');
  }

  searchPricingProduct(data: any) {
    const { productName } = data;
    if (productName && productName.trim() !== '') {
      this.showCategories = false;
      this.productUsecase.getProductsByName(productName).subscribe(
        (products: PricedProductsByCategory[]) => {
          this.listPricingProducts = products;
          console.log('Products loaded successfully:', products);
        },
        (error: any) => {
          console.error('Error loading Products:', error);
        }
      );
      console.log('productName:', productName);
    }else{
      this.showCategories = true;
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
