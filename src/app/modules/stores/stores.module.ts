import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { CreateStoreComponent } from './ui/create-store/create-store.component';


@NgModule({
  declarations: [
    CreateStoreComponent
  ],
  imports: [
    CommonModule,
    StoresRoutingModule
  ]
})
export class StoresModule { }
