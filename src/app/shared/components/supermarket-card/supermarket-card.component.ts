import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuperMarket } from '../../../modules/supermarket/domain/model/supermarket.model';

@Component({
  selector: 'app-supermarket-card',
  templateUrl: './supermarket-card.component.html',
  styleUrls: ['./supermarket-card.component.scss']
})
export class SuperMarketCardComponent {

  @Input() supermarket!: SuperMarket;
  @Input() editMode = false;
  showFormEdit = false;
  @Output() editSupermarketEvent = new EventEmitter<SuperMarket>();
  editingSupermarket!: SuperMarket;

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
