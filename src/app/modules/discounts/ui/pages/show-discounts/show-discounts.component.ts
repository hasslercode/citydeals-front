import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DiscountsToday } from '../../../domain/model/discount.model';
import { DiscountsUsecase } from '../../../domain/usecase/discounts.usecase';
@Component({
  selector: 'app-show-discounts',
  templateUrl: './show-discounts.component.html',
  styleUrls: ['./show-discounts.component.scss'],
})
export class ShowDiscountsComponent {
  currentDate: Date;
  discountsToday: DiscountsToday[] = [];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private discountsUsecase: DiscountsUsecase
  ) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.loadDiscountsToday();
  }

  loadDiscountsToday(): void {
    this.discountsUsecase.getDiscountsToday().subscribe(
      (data: DiscountsToday[]) => {
        this.discountsToday = data;
      },
      (error) => {
        console.error('Error loading discounts today:', error);
      }
    );
  }
  redirectToCreateDiscount() {
    this.router.navigate(['discounts/create']);
  }

  getFormattedDateTime(): string {
    return (
      this.datePipe.transform(this.currentDate, 'd MMMM y - HH:mm', 'es') ||
      this.currentDate.toDateString()
    );
  }

  getDayOfWeek(): string {
    return (
      this.datePipe
        .transform(this.currentDate, 'EEEE', 'es')
        ?.replace(/^\w/, (c) => c.toUpperCase()) || ''
    );
  }
}
