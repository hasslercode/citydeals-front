import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { UpdatePricingComponent } from './ui/pages/update-pricing/update-pricing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompareProductsComponent } from './ui/pages/compare-products/compare-products.component';
import { PricingUseCase } from './domain/usecase/pricing.usecase';
import { PricingGateway } from './domain/gateway/pricing.gateway';
import { PricingService } from './infraestructure/driven-adapter/pricing.service';


@NgModule({
  declarations: [
    UpdatePricingComponent,
    CompareProductsComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule,
    SharedModule
  ],
  providers:[
    PricingUseCase,
    {
      provide: PricingGateway,
      useClass: PricingService,
    },
  ]
})
export class PricingModule { }
