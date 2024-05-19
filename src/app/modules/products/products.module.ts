import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './ui/pages/create-product/create-product.component';
import { SearchProductComponent } from './ui/pages/search-product/search-product.component';
import { ShowProductComponent } from './ui/pages/show-product/show-product.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsUsecase } from './domain/usecase/products.usecase';
import { ProductsGateway } from './domain/gateway/products.gateway';
import { ProductsService } from './infraestructure/driven-adapter/products.service';


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
  ],
  providers: [
    ProductsUsecase,
    {
      provide: ProductsGateway,
      useClass: ProductsService,
    },
  ]
})
export class ProductsModule { }
