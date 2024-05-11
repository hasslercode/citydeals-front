import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDiscountsComponent } from './ui/pages/show-discounts/show-discounts.component';

const routes: Routes = [
  { path: 'results', component: ShowDiscountsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }
