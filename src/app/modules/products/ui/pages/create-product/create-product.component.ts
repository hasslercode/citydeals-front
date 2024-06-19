import { Component, OnInit, ViewChild } from '@angular/core';
import { PRODUCT_FORM_FIELDS } from '../../utils/product-fields';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CategoryUseCase } from 'src/app/modules/category/domain/usecase/category.usecase';
import { ProductsUsecase } from '../../../domain/usecase/products.usecase';
import { ListCategory } from 'src/app/modules/category/domain/model/category.model';
import { ListProduct } from '../../../domain/model/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

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
    private categoryUsecase: CategoryUseCase,
    private productUsecase: ProductsUsecase,
  ) {
    this.loadFormFields();
  }


  ngOnInit(): void {
    this.loadCategories();
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

  loadFormFields() {
    this.formData = PRODUCT_FORM_FIELDS;
    const informationMessage = this.formData.informationMessage;
    this.titleModal = informationMessage.title;
    this.subtitleModal = informationMessage.subtitle;
    this.btnTextModal = informationMessage.btnTextModal || '';
    this.subtitleErrorModal = informationMessage.subtitle_error || '';
  }


  registerProduct(data: any) {
    if (!data) return;
    const newProduct: ListProduct = { ...data };
    this.productUsecase.createNewProduct(newProduct).subscribe(
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

  private setModal() {
    this.modalService.setModal(this.modalInfo);
  }

  handleAccept(event: any) {
    this.router.navigate(['/products/search']);
  }

  private handleSuccess() {
    console.log('New product created successfully');
    this.showModal('Gestión de productos', 'El producto se ha creado correctamente.');
  }

  private handleError(error: any) {
    console.error('Error creating new product:', error);
    this.showModal('Gestión de productos', 'El producto no se ha creado.');
  }

  redirectToLogin() {
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 3000);
  }

}
