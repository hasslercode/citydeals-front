import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { UpdatePricingComponent } from './ui/pages/update-pricing/update-pricing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompareProductsComponent } from './ui/pages/compare-products/compare-products.component';


@NgModule({
  declarations: [
    UpdatePricingComponent,
    CompareProductsComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule,
    SharedModule
  ]
})
export class PricingModule { }
