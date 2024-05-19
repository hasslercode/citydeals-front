import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListProduct, Product } from 'src/app/modules/products/domain/model/product.model';
import { DEFAULT_IMAGE } from '../../interfaces/responses';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ListProduct;
  @Input() editMode = false;
  showFormEdit = false;
  @Output() editProductEvent = new EventEmitter<ListProduct>();
  editingProduct!: ListProduct;
  defaultImage: string = DEFAULT_IMAGE;

  constructor() { }

  ngOnInit() {
    this.editingProduct = { ...this.product };
  }

  editProduct() {
    this.showFormEdit = true;
  }

  saveProduct() {
    this.product = { ...this.editingProduct };
    this.showFormEdit = false;
    this.editProductEvent.emit(this.product);
  }
}
