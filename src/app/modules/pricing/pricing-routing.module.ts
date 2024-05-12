import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePricingComponent } from './ui/pages/update-pricing/update-pricing.component';
import { CompareProductsComponent } from './ui/pages/compare-products/compare-products.component';


const routes: Routes = [
  { path: 'update', component: UpdatePricingComponent },
  { path: 'search', component: CompareProductsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule { }
