import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { FormDataFormat } from 'src/app/shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DISCOUNT_FORM_FIELDS } from '../../utils/discounts-fields';
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
    private modalService: ModalService
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
