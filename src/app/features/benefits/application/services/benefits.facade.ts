import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BenefitType } from '../../domain/enums/benefit-type.enum';
import { BenefitFilters } from '../../domain/interfaces/benefit-repository.interface';
import { Benefit, WeekDay } from '../../domain/models/benefit.model';
import { FilterBenefitsUseCase } from '../use-cases/filter-benefits.use-case';
import { GetBenefitsByDayUseCase } from '../use-cases/get-benefits-by-day.use-case';
import { GetBenefitsUseCase } from '../use-cases/get-benefits.use-case';

@Injectable()
export class BenefitsFacade {
  private readonly getBenefitsUseCase = inject(GetBenefitsUseCase);
  private readonly filterBenefitsUseCase = inject(FilterBenefitsUseCase);
  private readonly getBenefitsByDayUseCase = inject(GetBenefitsByDayUseCase);

  private readonly allBenefitsSubject = new BehaviorSubject<Benefit[]>([]);
  private readonly todayBenefitsSubject = new BehaviorSubject<Benefit[]>([]);
  private readonly filteredBenefitsSubject = new BehaviorSubject<Benefit[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  readonly allBenefits$ = this.allBenefitsSubject.asObservable();
  readonly todayBenefits$ = this.todayBenefitsSubject.asObservable();
  readonly filteredBenefits$ = this.filteredBenefitsSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  readonly availableSources$ = this.allBenefits$.pipe(
    map((benefits: Benefit[]) => [...new Set(benefits.map((item: Benefit) => item.source))]),
  );

  readonly availableCategories$ = this.allBenefits$.pipe(
    map((benefits: Benefit[]) => [...new Set(benefits.map((item: Benefit) => item.category))]),
  );

  readonly availableTypes$ = this.allBenefits$.pipe(
    map(
      (benefits: Benefit[]) =>
        [...new Set(benefits.map((item: Benefit) => item.type))] as BenefitType[],
    ),
  );

  loadInitialData(today: WeekDay): void {
    this.loadingSubject.next(true);
    this.getBenefitsUseCase.execute().subscribe((benefits) => {
      this.allBenefitsSubject.next(benefits);
      this.filteredBenefitsSubject.next(benefits);
      this.loadingSubject.next(false);
    });

    this.getBenefitsByDayUseCase.execute(today).subscribe((benefits) => {
      this.todayBenefitsSubject.next(benefits);
    });
  }

  applyFilters(filters: BenefitFilters): void {
    this.loadingSubject.next(true);
    this.filterBenefitsUseCase.execute(filters).subscribe((benefits) => {
      this.filteredBenefitsSubject.next(benefits);
      this.loadingSubject.next(false);
    });
  }
}
