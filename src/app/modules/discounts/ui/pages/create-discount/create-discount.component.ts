import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DISCOUNT_FORM_FIELDS } from '../../utils/discounts-fields';
import { NewDiscount } from '../../../domain/model/discount.model';
import { DiscountsUsecase } from '../../../domain/usecase/discounts.usecase';
import { ProductsUsecase } from 'src/app/modules/products/domain/usecase/products.usecase';
import { CategoryUseCase } from 'src/app/modules/category/domain/usecase/category.usecase';
import { ListCategory } from 'src/app/modules/category/domain/model/category.model';
import { ListProduct } from 'src/app/modules/products/domain/model/product.model';
import { SupermarketUseCase } from 'src/app/modules/supermarket/domain/usecase/supermarket.usecase';
import { ListSupermarket } from 'src/app/modules/supermarket/domain/model/supermarket.model';
@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.scss']
})
export class CreateDiscountComponent implements OnInit {


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
    private discountsUsecase: DiscountsUsecase,
    private productUsecase: ProductsUsecase,
    private categoryUsecase: CategoryUseCase,
    private supermarketUsecase: SupermarketUseCase,
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
    this.formData = DISCOUNT_FORM_FIELDS;
    const informationMessage = this.formData.informationMessage;
    this.titleModal = informationMessage.title;
    this.subtitleModal = informationMessage.subtitle;
    this.btnTextModal = informationMessage.btnTextModal || '';
    this.subtitleErrorModal = informationMessage.subtitle_error || '';
  }


  registerDiscount(data: any) {
    if (!data) return;
    const newDiscount: NewDiscount = { ...data };
    newDiscount.productId = newDiscount.productId || null;
    this.discountsUsecase.createNewDiscount(newDiscount).subscribe(
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
    this.showModal('Gestión de descuentos', 'El descuento se ha creado correctamente.');
  }

  private handleError(error: any) {
    console.error('Error creating new discount:', error);
    this.showModal('Gestión de descuentos', 'El descuento no se ha creado.');
  }

  setModal() {
    this.modalService.setModal(this.modalInfo);
  }

  handleAccept(event: any) {
    this.router.navigate(['/discounts/results']);
  }

  redirectToLogin() {
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 3000);
  }

}
