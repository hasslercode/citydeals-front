import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'benefits',
  },
  {
    path: 'benefits',
    loadChildren: () =>
      import('./features/benefits/benefits.routes').then((m) => m.benefitsRoutes),
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./shared/components/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
    data: { title: 'Expenses (próximamente)' },
  },
  {
    path: 'insights',
    loadComponent: () =>
      import('./shared/components/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
    data: { title: 'Insights (próximamente)' },
  },
  {
    path: 'cost-of-living',
    loadComponent: () =>
      import('./shared/components/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
    data: { title: 'Cost of Living (próximamente)' },
  },
  {
    path: '**',
    redirectTo: 'benefits',
  },
];
