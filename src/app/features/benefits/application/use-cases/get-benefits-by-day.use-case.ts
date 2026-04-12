import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BenefitRepository } from '../../domain/interfaces/benefit-repository.interface';
import { Benefit, WeekDay } from '../../domain/models/benefit.model';

@Injectable()
export class GetBenefitsByDayUseCase {
  private readonly repository = inject(BenefitRepository);

  execute(day: WeekDay): Observable<Benefit[]> {
    return this.repository.getBenefitsByDay(day);
  }
}
