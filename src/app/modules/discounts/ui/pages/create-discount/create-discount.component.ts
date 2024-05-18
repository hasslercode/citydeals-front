import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DISCOUNT_FORM_FIELDS } from '../../utils/discounts-fields';
import { NewDiscount } from '../../../domain/model/discount.model';
import { DiscountsUsecase } from '../../../domain/usecase/discounts.usecase';
@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.scss']
})
export class CreateDiscountComponent {


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
    private discountsUsecase: DiscountsUsecase
  ) {
    this.loadFormFields();
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
    newDiscount.type = newDiscount.productId ? 'product' : 'category';
    newDiscount[newDiscount.type === 'product' ? 'categoryId' : 'productId'] = null;

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
    // if (this.isRegistered) {
    //   this.router.navigate(['/login']);
    // }
  }

  redirectToLogin() {
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 3000);
  }

}
