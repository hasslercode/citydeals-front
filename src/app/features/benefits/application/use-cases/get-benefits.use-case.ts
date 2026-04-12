import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefit } from '../../domain/models/benefit.model';
import { BenefitRepository } from '../../domain/interfaces/benefit-repository.interface';

@Injectable()
export class GetBenefitsUseCase {
  private readonly repository = inject(BenefitRepository);

  execute(): Observable<Benefit[]> {
    return this.repository.getBenefits();
  }
}
