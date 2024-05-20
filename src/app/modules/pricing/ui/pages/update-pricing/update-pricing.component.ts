import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PRICING_PRODUCT_FORM_FIELDS } from '../utils/pricing-fields';
import { ListCategory } from 'src/app/modules/category/domain/model/category.model';
import { ListSupermarket } from 'src/app/modules/supermarket/domain/model/supermarket.model';
import { ListProduct } from 'src/app/modules/products/domain/model/product.model';
import { ProductsUsecase } from 'src/app/modules/products/domain/usecase/products.usecase';
import { CategoryUseCase } from 'src/app/modules/category/domain/usecase/category.usecase';
import { SupermarketUseCase } from 'src/app/modules/supermarket/domain/usecase/supermarket.usecase';
import { PricingUseCase } from '../../../domain/usecase/pricing.usecase';

@Component({
  selector: 'app-update-pricing',
  templateUrl: './update-pricing.component.html',
  styleUrls: ['./update-pricing.component.scss']
})
export class UpdatePricingComponent {
  @ViewChild('modal') modalInfo!: ModalComponent;
  isRegistered: boolean = false;
  formData!: FormDataFormat;
  titleModal: string = '';
  subtitleModal: string = '';
  subtitleErrorModal: string = '';
  btnTextModal: string = '';
  constructor(
    private router: Router,
    private modalService: ModalService,
    private productUsecase: ProductsUsecase,
    private categoryUsecase: CategoryUseCase,
    private supermarketUsecase: SupermarketUseCase,
    private pricingUsecase: PricingUseCase,
  ) {
    this.loadFormFields();
  }


  ngOnInit(): void {
    this.loadCategories();
    this.loadSupermarkets();
  }

  loadCategories(): void {
    this.categoryUsecase.getListCategories().subscribe(
      (categories: ListCategory[]) => {
        const listElement = this.formData.contents.formElements?.find(
          (element) => element.requestId === 'categoryId'
        );
        if (listElement) {
          listElement.options = categories.map((obj: any) => ({
            label: `${obj.name}`,
            value: obj.id,
          }));
        }
        console.log('Categories loaded successfully:', categories);
      },
      (error) => {
        console.error('Error loading categories:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  loadSupermarkets(): void {
    this.supermarketUsecase.getListSupermarket().subscribe(
      (supermarkets: ListSupermarket[]) => {
        const listElement = this.formData.contents.formElements?.find(
          (element) => element.requestId === 'supermarketId'
        );
        if (listElement) {
          listElement.options = supermarkets.map((obj: any) => ({
            label: `${obj.name}`,
            value: obj.id,
          }));
        }
        console.log('supermarkets loaded successfully:', supermarkets);
      },
      (error) => {
        console.error('Error loading supermarkets:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  loadProducts(categoryId: number): void {
    this.productUsecase.getProductsByCategory(categoryId).subscribe(
      (products: ListProduct[]) => {
        const listElement = this.formData.contents.formElements?.find(
          (element) => element.requestId === 'productId'
        );
        if (listElement) {
          listElement.options = products.map((obj: any) => ({
            label: `${obj.name}`,
            value: obj.id,
          }));
        }
        console.log('products loaded successfully:', products);
      },
      (error) => {
        console.error('Error loading products:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  handleSelectChange(event: { id: string, value: any }) {
    if(event.id === 'categoryId'){
      this.loadProducts(event.value)
    }
  }

  loadFormFields() {
    this.formData = PRICING_PRODUCT_FORM_FIELDS;
    const informationMessage = this.formData.informationMessage;
    this.titleModal = informationMessage.title;
    this.subtitleModal = informationMessage.subtitle;
    this.btnTextModal = informationMessage.btnTextModal || '';
    this.subtitleErrorModal = informationMessage.subtitle_error || '';
  }

  registerPricingProduct(data: any) {
    this.pricingUsecase.updatePriceProduct(data).subscribe(
      () => this.handleSuccess(),
      (error) => this.handleError(error)
    );
  }


  showModal(title: string = this.titleModal, subtitle: string = this.subtitleModal, btnText: string = 'Aceptar') {
    this.setModal();
    this.modalService.showModal(
      title,
      subtitle,
      btnText
    );
  }

  private handleSuccess() {
    console.log('New discount created successfully');
    this.showModal('Gestión de precios', 'El precio se ha registrado correctamente.');
  }

  private handleError(error: any) {
    console.error('Error creating new discount:', error);
    this.showModal('Gestión de precios', 'El precio no se ha registrado.');
  }

  setModal() {
    this.modalService.setModal(this.modalInfo);
  }
  handleAccept(event: any) {
    this.router.navigate(['/pricing/update']);
  }

  redirectToLogin() {
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 3000);
  }
}
