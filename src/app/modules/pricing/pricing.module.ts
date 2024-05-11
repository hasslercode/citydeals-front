import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { UpdatePricingComponent } from './ui/pages/update-pricing/update-pricing.component';


@NgModule({
  declarations: [
    UpdatePricingComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule
  ]
})
export class PricingModule { }
