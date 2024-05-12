import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FormDataFormat } from '../../../../../shared/interfaces/custom-form';
import { Router } from '@angular/router';
import { ModalService } from '../../../../../shared/services/modal.service';
import { REGISTER_CART_FORM } from '../../utils/cart-fields';
@Component({
  selector: 'app-register-cart',
  templateUrl: './register-cart.component.html',
  styleUrls: ['./register-cart.component.scss']
})
export class RegisterCartComponent {


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
    this.formData = REGISTER_CART_FORM;
    const informationMessage = this.formData.informationMessage;
    this.titleModal = informationMessage.title;
    this.subtitleModal = informationMessage.subtitle;
    this.btnTextModal = informationMessage.btnTextModal || '';
    this.subtitleErrorModal = informationMessage.subtitle_error || '';
  }

  registerCart(data: any) {
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
