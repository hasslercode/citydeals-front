import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { CreateDiscountComponent } from './ui/pages/create-discount/create-discount.component';
import { HomeDiscountsComponent } from './ui/pages/home-discounts/home-discounts.component';


@NgModule({
  declarations: [
    CreateDiscountComponent,
    HomeDiscountsComponent
  ],
  imports: [
    CommonModule,
    DiscountsRoutingModule
  ]
})
export class DiscountsModule { }
