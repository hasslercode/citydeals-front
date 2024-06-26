import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDiscountsComponent } from './ui/pages/show-discounts/show-discounts.component';
import { CreateDiscountComponent } from './ui/pages/create-discount/create-discount.component';

const routes: Routes = [
  { path: 'results', component: ShowDiscountsComponent },
  { path: 'create', component: CreateDiscountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }
