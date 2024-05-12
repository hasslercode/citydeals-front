import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'discounts/results',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products-routing.module').then(
        (m) => m.ProductsRoutingModule
      ),
  },
  {
    path: 'discounts',
    loadChildren: () =>
      import('./modules/discounts/discounts-routing.module').then(
        (m) => m.DiscountsRoutingModule
      ),
  },
  {
    path: 'supermarkets',
    loadChildren: () =>
      import('./modules/supermarket/supermarket-routing.module').then(
        (m) => m.SupermarketRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
