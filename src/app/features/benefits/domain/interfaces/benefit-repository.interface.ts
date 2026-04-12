import { Observable } from 'rxjs';
import { Benefit, WeekDay } from '../models/benefit.model';
import { BenefitType } from '../enums/benefit-type.enum';

export interface BenefitFilters {
  source?: string;
  category?: string;
  type?: BenefitType;
  onlyToday?: boolean;
}

export abstract class BenefitRepository {
  abstract getBenefits(): Observable<Benefit[]>;
  abstract getBenefitsByDay(day: WeekDay): Observable<Benefit[]>;
  abstract getBenefitsByCategory(category: string): Observable<Benefit[]>;
  abstract filterBenefits(filters: BenefitFilters): Observable<Benefit[]>;
}
