import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './ui/pages/create-product/create-product.component';
import { ShowProductComponent } from './ui/pages/show-product/show-product.component';
import { SearchProductComponent } from './ui/pages/search-product/search-product.component';

const routes: Routes = [
  { path: 'create', component: CreateProductComponent },
  { path: 'results', component: ShowProductComponent },
  { path: 'search', component: SearchProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
