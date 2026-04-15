import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BenefitType } from '../../domain/enums/benefit-type.enum';
import { BenefitFilters } from '../../domain/interfaces/benefit-repository.interface';
import { Benefit, WeekDay } from '../../domain/models/benefit.model';
import { FilterBenefitsUseCase } from '../use-cases/filter-benefits.use-case';
import { GetBenefitsByDayUseCase } from '../use-cases/get-benefits-by-day.use-case';
import { GetBenefitsUseCase } from '../use-cases/get-benefits.use-case';

export interface SourceGroup {
  source: string;
  benefits: Benefit[];
}

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

  readonly featuredBenefits$ = this.todayBenefits$.pipe(
    map((benefits) =>
      benefits.filter((b) => b.type !== BenefitType.INFO).slice(0, 3)
    )
  );

  readonly availableSources$ = this.allBenefits$.pipe(
    map((benefits) => [...new Set(benefits.map((b) => b.source))].sort())
  );

  readonly availableCategories$ = this.allBenefits$.pipe(
    map((benefits) => [...new Set(benefits.map((b) => b.category))].sort())
  );

  readonly availableTypes$ = this.allBenefits$.pipe(
    map((benefits) => [...new Set(benefits.map((b) => b.type))] as BenefitType[])
  );

  readonly availableCardTypes$ = this.allBenefits$.pipe(
    map((benefits) =>
      [...new Set(
        benefits.map((b) => b.cardType).filter((ct): ct is NonNullable<typeof ct> => ct !== null)
      )].sort()
    )
  );

  /** Benefits grouped by source, sorted by count desc. */
  readonly benefitsBySource$ = this.allBenefits$.pipe(
    map((benefits) => {
      const grp = new Map<string, Benefit[]>();
      for (const b of benefits) {
        const list = grp.get(b.source) ?? [];
        list.push(b);
        grp.set(b.source, list);
      }
      return [...grp.entries()]
        .sort((a, b) => b[1].length - a[1].length)
        .map(([source, list]) => ({ source, benefits: list } as SourceGroup));
    })
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
