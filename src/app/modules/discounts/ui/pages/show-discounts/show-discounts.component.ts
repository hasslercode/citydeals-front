import { Component } from '@angular/core';
import { Discount } from '../../../domain/model/discount.model';
import { SHOW_DISCOUNTS_MOCK } from '../../../../../shared/mocks/discounts/discounts-mock';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-discounts',
  templateUrl: './show-discounts.component.html',
  styleUrls: ['./show-discounts.component.scss'],
})
export class ShowDiscountsComponent {
  discounts: Discount[] = [];
  currentDate: Date;

  constructor(private datePipe: DatePipe, private router: Router) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.loadDiscounts();
  }

  redirectToCreateDiscount(){
    this.router.navigate(['discounts/create']);
  }

  loadDiscounts() {
  this.discounts = SHOW_DISCOUNTS_MOCK;
  }

  getFormattedDateTime(): string {
    return this.datePipe.transform(this.currentDate, 'd MMMM y - HH:mm', 'es') || this.currentDate.toDateString();
  }

  getDayOfWeek(): string {
    return this.datePipe.transform(this.currentDate, 'EEEE', 'es')?.replace(/^\w/, (c) => c.toUpperCase()) || '';
  }

}
