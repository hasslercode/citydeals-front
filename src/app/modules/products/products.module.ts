import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './ui/pages/create-product/create-product.component';
import { SearchProductComponent } from './ui/pages/search-product/search-product.component';
import { ShowProductComponent } from './ui/pages/show-product/show-product.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CreateProductComponent,
    SearchProductComponent,
    ShowProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
