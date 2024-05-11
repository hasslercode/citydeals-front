import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './modules/products/products.module';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './modules/category/category.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { SupermarketModule } from './modules/supermarket/supermarket.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    CategoryModule,
    DiscountsModule,
    PricingModule,
    SupermarketModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
