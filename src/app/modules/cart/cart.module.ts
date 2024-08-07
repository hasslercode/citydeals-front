import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { RegisterCartComponent } from './ui/pages/register-cart/register-cart.component';
import { SharedModule } from '../../shared/shared.module';
import { ShoppingListComponent } from './ui/pages/shopping-list/shopping-list.component';


@NgModule({
  declarations: [
    RegisterCartComponent,
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
