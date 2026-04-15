import { Observable } from 'rxjs';
import { Benefit, WeekDay } from '../models/benefit.model';
import { BenefitType } from '../enums/benefit-type.enum';

export interface BenefitFilters {
  sources?: string[];
  category?: string;
  type?: BenefitType;
  cardType?: string;
  onlyToday?: boolean;
  day?: WeekDay;
}

export abstract class BenefitRepository {
  abstract getBenefits(): Observable<Benefit[]>;
  abstract getBenefitsByDay(day: WeekDay): Observable<Benefit[]>;
  abstract getBenefitsByCategory(category: string): Observable<Benefit[]>;
  abstract filterBenefits(filters: BenefitFilters): Observable<Benefit[]>;
}
