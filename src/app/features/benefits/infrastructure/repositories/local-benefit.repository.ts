import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import {
  BenefitFilters,
  BenefitRepository,
} from '../../domain/interfaces/benefit-repository.interface';
import { Benefit, WeekDay } from '../../domain/models/benefit.model';
import { BenefitSourceFile } from '../../domain/models/source.model';
import { getCurrentWeekDay } from '../../../../shared/utils/day.utils';

@Injectable()
export class LocalBenefitRepository implements BenefitRepository {
  private readonly sourcesIndexUrl = 'assets/benefits/sources-index.json';

  constructor(private readonly http: HttpClient) {}

  getBenefits(): Observable<Benefit[]> {
    return this.http.get<BenefitSourceFile[]>(this.sourcesIndexUrl).pipe(
      switchMap((sources) =>
        forkJoin(sources.map((s) => this.http.get<Benefit[]>(s.file)))
      ),
      map((groups) => groups.flat().filter((benefit) => this.isActiveNow(benefit)))
    );
  }

  getBenefitsByDay(day: WeekDay): Observable<Benefit[]> {
    return this.getBenefits().pipe(
      map((benefits) => benefits.filter((benefit) => this.appliesOnDay(benefit, day)))
    );
  }

  getBenefitsByCategory(category: string): Observable<Benefit[]> {
    return this.getBenefits().pipe(
      map((benefits) =>
        benefits.filter(
          (benefit) => benefit.category.toLowerCase() === category.toLowerCase()
        )
      )
    );
  }

  filterBenefits(filters: BenefitFilters): Observable<Benefit[]> {
    return this.getBenefits().pipe(
      map((benefits) => {
        const today = getCurrentWeekDay();

        return benefits.filter((benefit) => {
          const sourceMatch =
            !filters.sources?.length ||
            filters.sources.some((s) =>
              benefit.source.toLowerCase().includes(s.toLowerCase())
            );
          const categoryMatch =
            !filters.category ||
            benefit.category.toLowerCase() === filters.category.toLowerCase();
          const typeMatch = !filters.type || benefit.type === filters.type;
          const cardTypeMatch =
            !filters.cardType || benefit.cardType === filters.cardType;
          const onlyTodayMatch =
            !filters.onlyToday || this.appliesOnDay(benefit, today);

          return sourceMatch && categoryMatch && typeMatch && cardTypeMatch && onlyTodayMatch;
        });
      })
    );
  }

  private appliesOnDay(benefit: Benefit, day: WeekDay): boolean {
    return benefit.appliesEveryDay || benefit.validDays.includes(day);
  }

  private isActiveNow(benefit: Benefit): boolean {
    const start = this.parseDateOnly(benefit.activeFrom);
    const end = this.parseDateOnly(benefit.activeTo);

    if (!start || !end) {
      return true;
    }

    const today = this.startOfDay(new Date());
    return today >= start && today <= end;
  }

  private parseDateOnly(rawDate: string): Date | null {
    const date = new Date(`${rawDate}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : this.startOfDay(date);
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
