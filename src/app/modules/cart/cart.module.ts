import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { RegisterCartComponent } from './ui/pages/register-cart/register-cart.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    RegisterCartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
