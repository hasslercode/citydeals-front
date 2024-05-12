import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSupermarketComponent } from './ui/pages/create-supermarket/create-supermarket.component';
import { SearchSupermarketsComponent } from './ui/pages/search-supermarkets/search-supermarkets.component';

const routes: Routes = [
  { path: 'create', component: CreateSupermarketComponent },
  { path: 'search', component: SearchSupermarketsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupermarketRoutingModule { }
