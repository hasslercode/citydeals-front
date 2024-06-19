import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListSupermarket, SuperMarket } from '../../../modules/supermarket/domain/model/supermarket.model';

@Component({
  selector: 'app-supermarket-card',
  templateUrl: './supermarket-card.component.html',
  styleUrls: ['./supermarket-card.component.scss']
})
export class SuperMarketCardComponent {

  @Input() supermarket!: ListSupermarket;
  @Input() editMode = false;
  showFormEdit = false;
  @Output() editSupermarketEvent = new EventEmitter<ListSupermarket>();
  editingSupermarket!: ListSupermarket;

  ngOnInit() {
    this.editingSupermarket = { ...this.supermarket };
  }

  editSupermarket() {
    this.showFormEdit = true;
  }

  saveSupermarket() {
    this.supermarket = { ...this.editingSupermarket };
    this.showFormEdit = false;
    this.editSupermarketEvent.emit(this.supermarket);
  }
}
