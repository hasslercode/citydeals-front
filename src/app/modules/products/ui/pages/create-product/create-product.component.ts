import { Component, ViewChild } from '@angular/core';
import { PRODUCT_FORM_FIELDS } from '../../utils/product-fields';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  @ViewChild('modal') modalInfo!: ModalComponent;
  isRegistered: boolean = false;
  formData!: FormDataFormat;
  titleModal: string = '';
  subtitleModal: string = '';
  subtitleErrorModal: string = '';
  btnTextModal: string = '';
  constructor(
    private router: Router,
    private modalService: ModalService
  ) {
    this.loadFormFields();
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
    console.log(data);
  }

  handleSuccess() {
    this.setModal();
    this.isRegistered = true;
    this.modalService.showModal(
      this.titleModal,
      this.subtitleModal,
      this.btnTextModal
    );
  }

  handleError() {
    this.setModal();
    this.modalService.showModal(
      this.titleModal,
      this.subtitleErrorModal,
      this.btnTextModal
    );
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
