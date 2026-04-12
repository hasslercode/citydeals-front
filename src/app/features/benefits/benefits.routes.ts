import { Route } from '@angular/router';
import { BenefitRepository } from './domain/interfaces/benefit-repository.interface';
import { LocalBenefitRepository } from './infrastructure/repositories/local-benefit.repository';
import { BenefitsFacade } from './application/services/benefits.facade';
import { GetBenefitsUseCase } from './application/use-cases/get-benefits.use-case';
import { FilterBenefitsUseCase } from './application/use-cases/filter-benefits.use-case';
import { GetBenefitsByDayUseCase } from './application/use-cases/get-benefits-by-day.use-case';
import { GetBenefitsByCategoryUseCase } from './application/use-cases/get-benefits-by-category.use-case';

export const benefitsRoutes: Route[] = [
  {
    path: '',
    providers: [
      BenefitsFacade,
      GetBenefitsUseCase,
      FilterBenefitsUseCase,
      GetBenefitsByDayUseCase,
      GetBenefitsByCategoryUseCase,
      {
        provide: BenefitRepository,
        useClass: LocalBenefitRepository,
      },
    ],
    loadComponent: () =>
      import('./ui/pages/benefits-home.page').then((m) => m.BenefitsHomePage),
  },
];
