import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCartComponent } from './ui/pages/register-cart/register-cart.component';

const routes: Routes = [
  { path: 'register', component: RegisterCartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
