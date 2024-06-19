import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePricingComponent } from './ui/pages/update-pricing/update-pricing.component';
import { CompareProductsComponent } from './ui/pages/compare-products/compare-products.component';
import { MultiplePricingComponent } from './ui/pages/multiple-pricing/multiple-pricing.component';


const routes: Routes = [
  { path: 'update', component: UpdatePricingComponent },
  { path: 'search', component: CompareProductsComponent },
  { path: 'multiple', component: MultiplePricingComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule { }
