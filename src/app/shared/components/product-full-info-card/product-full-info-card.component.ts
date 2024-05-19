import { Component, Input } from '@angular/core';
import { PricedProductsByCategory } from 'src/app/modules/products/domain/model/product.model';

@Component({
  selector: 'app-pricing-product-card',
  templateUrl: './product-full-info-card.component.html',
  styleUrls: ['./product-full-info-card.component.scss']
})
export class ProductFullInfoCardComponent {
  @Input() product!: PricedProductsByCategory;
}
