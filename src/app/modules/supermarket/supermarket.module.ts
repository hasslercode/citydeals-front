import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupermarketRoutingModule } from './supermarket-routing.module';
import { CreateSupermarketComponent } from './ui/pages/create-supermarket/create-supermarket.component';


@NgModule({
  declarations: [
    CreateSupermarketComponent
  ],
  imports: [
    CommonModule,
    SupermarketRoutingModule
  ]
})
export class SupermarketModule { }
