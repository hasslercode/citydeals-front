import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FormDataFormat } from '../../../../../shared/interfaces/custom-form';
import { ModalService } from '../../../../../shared/services/modal.service';
import { SUPERMARKET_FORM_FIELDS } from '../../utils/supermarket-fields';

@Component({
  selector: 'app-create-supermarket',
  templateUrl: './create-supermarket.component.html',
  styleUrls: ['./create-supermarket.component.scss']
})
export class CreateSupermarketComponent {
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
    this.formData = SUPERMARKET_FORM_FIELDS;
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
