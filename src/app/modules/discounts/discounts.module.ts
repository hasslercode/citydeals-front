import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { CreateDiscountComponent } from './ui/pages/create-discount/create-discount.component';
import { ShowDiscountsComponent } from './ui/pages/show-discounts/show-discounts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscountsUsecase } from './domain/usecase/discounts.usecase';
import { DiscountsGateway } from './domain/gateway/discounts.gateway';
import { DiscountsService } from './infraestructure/driven-adapter/discount.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CreateDiscountComponent,
    ShowDiscountsComponent
  ],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    DiscountsUsecase,
    {
      provide: DiscountsGateway,
      useClass: DiscountsService,
    },
  ]
})
export class DiscountsModule { }
