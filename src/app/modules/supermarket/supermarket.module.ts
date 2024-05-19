import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupermarketRoutingModule } from './supermarket-routing.module';
import { CreateSupermarketComponent } from './ui/pages/create-supermarket/create-supermarket.component';
import { ShowSupermarketsComponent } from './ui/pages/show-supermarkets/show-supermarkets.component';
import { SearchSupermarketsComponent } from './ui/pages/search-supermarkets/search-supermarkets.component';
import { SharedModule } from '../../shared/shared.module';
import { SupermarketUseCase } from './domain/usecase/supermarket.usecase';
import { SupermarketGateway } from './domain/gateway/supermarket.gateway';
import { SupermarketService } from './infraestructure/driven-adapter/supermarket.service';


@NgModule({
  declarations: [
    CreateSupermarketComponent,
    ShowSupermarketsComponent,
    SearchSupermarketsComponent
  ],
  imports: [
    CommonModule,
    SupermarketRoutingModule,
    SharedModule
  ],
  providers:[
    SupermarketUseCase,
    {
      provide: SupermarketGateway,
      useClass: SupermarketService,
    },
  ]
})
export class SupermarketModule { }
