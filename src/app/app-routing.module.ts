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
  {
    path: 'pricing',
    loadChildren: () =>
      import('./modules/pricing/pricing-routing.module').then(
        (m) => m.PricingRoutingModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart-routing.module').then(
        (m) => m.CartRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
