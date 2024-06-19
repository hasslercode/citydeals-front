import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { FormDataFormat } from '../../../../../shared/interfaces/custom-form';
import { ModalService } from '../../../../../shared/services/modal.service';
import { SUPERMARKET_FORM_FIELDS } from '../../utils/supermarket-fields';
import { ListSupermarket } from '../../../domain/model/supermarket.model';
import { SupermarketUseCase } from '../../../domain/usecase/supermarket.usecase';

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
    private modalService: ModalService,
    private supermarketUseCase: SupermarketUseCase,
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

  registerSuperMarket(data: any) {
    if (!data) return;
    const newItem: ListSupermarket = { ...data };
    this.supermarketUseCase.create(newItem).subscribe(
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
    this.router.navigate(['/supermarkets/search']);
  }

  private handleSuccess() {
    console.log('New product created successfully');
    this.showModal('Gestión de supermercados', 'El supermercado se ha creado correctamente.');
  }

  private handleError(error: any) {
    console.error('Error creating new product:', error);
    this.showModal('Gestión de supermercados', 'El supermercado no se ha creado.');
  }


  redirectToLogin() {
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 3000);
  }
}
