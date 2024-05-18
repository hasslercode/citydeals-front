import { Component } from '@angular/core';
import { PricedProductsByCategory } from '../../../domain/model/discount.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DiscountsUsecase } from '../../../domain/usecase/discounts.usecase';

@Component({
  selector: 'app-show-discounts',
  templateUrl: './show-discounts.component.html',
  styleUrls: ['./show-discounts.component.scss'],
})
export class ShowDiscountsComponent {

  pricedProducts: PricedProductsByCategory[] = [];
  currentDate: Date;
  categoryId = 1;
  loading = false;
  errorMessage = '';

  constructor(private datePipe: DatePipe, private router: Router, private discountsUsecase: DiscountsUsecase) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.getPricedProductsByCategory();
  }

  redirectToCreateDiscount(){
    this.router.navigate(['discounts/create']);
  }

 getPricedProductsByCategory(): void {
    this.loading = true;
    this.errorMessage = '';
    this.discountsUsecase.getPricedProductsByCategory(this.categoryId)
      .subscribe(
        (products) => {
          this.pricedProducts = products;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Error al obtener productos. Intente nuevamente más tarde.';
          this.loading = false;
          console.error('Error al obtener productos:', error);
        }
      );
  }



  getFormattedDateTime(): string {
    return this.datePipe.transform(this.currentDate, 'd MMMM y - HH:mm', 'es') || this.currentDate.toDateString();
  }

  getDayOfWeek(): string {
    return this.datePipe.transform(this.currentDate, 'EEEE', 'es')?.replace(/^\w/, (c) => c.toUpperCase()) || '';
  }

}
