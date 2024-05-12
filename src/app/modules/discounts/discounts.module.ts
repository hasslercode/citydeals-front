import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { CreateDiscountComponent } from './ui/pages/create-discount/create-discount.component';
import { ShowDiscountsComponent } from './ui/pages/show-discounts/show-discounts.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateDiscountComponent,
    ShowDiscountsComponent
  ],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class DiscountsModule { }
