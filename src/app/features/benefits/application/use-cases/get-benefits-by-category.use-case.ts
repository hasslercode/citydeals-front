import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BenefitRepository } from '../../domain/interfaces/benefit-repository.interface';
import { Benefit } from '../../domain/models/benefit.model';

@Injectable()
export class GetBenefitsByCategoryUseCase {
  private readonly repository = inject(BenefitRepository);

  execute(category: string): Observable<Benefit[]> {
    return this.repository.getBenefitsByCategory(category);
  }
}
