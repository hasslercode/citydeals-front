import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/modules/products/domain/model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product;
  @Input() editMode = false;
  showFormEdit = false;
  @Output() editProductEvent = new EventEmitter<Product>();
  editingProduct!: Product;

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
