import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CreateCategoryComponent } from './ui/pages/create-category/create-category.component';
import { CategoryUseCase } from './domain/usecase/category.usecase';
import { HttpClientModule } from '@angular/common/http';
import { CategoryGateway } from './domain/gateway/category.gateway';
import { CategoryService } from './infraestructure/driven-adapter/category.service';


@NgModule({
  declarations: [
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    HttpClientModule
  ],
  providers: [
    CategoryUseCase,
    {
      provide: CategoryGateway,
      useClass: CategoryService,
    },
  ]
})
export class CategoryModule { }
