import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SuperMarketCardComponent } from './components/supermarket-card/supermarket-card.component';
import { ProductFullInfoCardComponent } from './components/product-full-info-card/product-full-info-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DynamicFormComponent,
    ModalComponent,
    ProductCardComponent,
    SuperMarketCardComponent,
    ProductFullInfoCardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DynamicFormComponent,
    ModalComponent,
    ProductCardComponent,
    SuperMarketCardComponent,
    ProductFullInfoCardComponent
  ],
})
export class SharedModule {}
