import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCartComponent } from './ui/pages/register-cart/register-cart.component';
import { ShoppingListComponent } from './ui/pages/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: 'register', component: RegisterCartComponent },
  { path: 'list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
