import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalComponent: ModalComponent | null = null;

  setModal(modal: ModalComponent) {
    this.modalComponent = modal;
  }

  showModal(title: string, description: string, buttonTxt?: string): void {
    if(this.modalComponent){
      this.modalComponent.displayModal = true;
      this.modalComponent.title = title;
      this.modalComponent.description = description;
      this.modalComponent.textBtn = buttonTxt || 'Aceptar';
    }
  }

  getModal(){
    return this.modalComponent;
  }

  closeModal(): void {
    if(this.modalComponent){
      this.modalComponent.displayModal = false;
    }
  }

}
