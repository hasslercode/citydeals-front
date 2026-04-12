import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BenefitFilters,
  BenefitRepository,
} from '../../domain/interfaces/benefit-repository.interface';
import { Benefit } from '../../domain/models/benefit.model';

@Injectable()
export class FilterBenefitsUseCase {
  private readonly repository = inject(BenefitRepository);

  execute(filters: BenefitFilters): Observable<Benefit[]> {
    return this.repository.filterBenefits(filters);
  }
}
