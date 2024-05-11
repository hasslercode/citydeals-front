import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent{

  @Input() displayModal: boolean = false;
  title: string = '';
  isCancellable: boolean = false;
  primaryButtonDisabled: boolean = false;
  description: string = '';
  textBtn: string = '';
  textBtnLeft: string = '';
  displayButton: boolean = true;

  @Output() accept: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  closeModal(event: any): void {
    this.displayModal = false;
    this.cancel.emit(event);
  }

  onAccept(event: any): void {
    this.displayModal = false;
    this.accept.emit(event);
  }
}
