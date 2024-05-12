import { Component, Input } from '@angular/core';
import { PricingProduct } from 'src/app/modules/pricing/domain/model/pricing.model';
import { Product } from 'src/app/modules/products/domain/model/product.model';

@Component({
  selector: 'app-pricing-product-card',
  templateUrl: './product-full-info-card.component.html',
  styleUrls: ['./product-full-info-card.component.scss']
})
export class ProductFullInfoCardComponent {
  @Input() product!: Product;
}
