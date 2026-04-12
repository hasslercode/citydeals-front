import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BenefitsFacade } from '../../application/services/benefits.facade';
import { BenefitFilters } from '../../domain/interfaces/benefit-repository.interface';
import { BenefitFiltersComponent } from '../components/benefit-filters.component';
import { BenefitListComponent } from '../components/benefit-list.component';
import { getCurrentWeekDay } from '../../../../shared/utils/day.utils';
import { getCategoryLabel } from '../utils/benefit-labels';

@Component({
    selector: 'app-benefits-home-page',
    imports: [CommonModule, BenefitFiltersComponent, BenefitListComponent],
    template: `
    <section class="category-hero" *ngIf="!startedSelection; else resultsView">
      <p class="eyebrow">Comienza aquí</p>
      <h3>Elige una categoría para comenzar</h3>
      <p class="hint">Selecciona una categoría y te mostramos beneficios personalizados.</p>

      <div class="category-grid" *ngIf="(facade.availableCategories$ | async) as categories">
        <button
          type="button"
          class="category-card"
          *ngFor="let category of categories"
          (click)="startWithCategory(category)"
        >
          <img [src]="categoryIcon(category)" [alt]="categoryLabel(category)" class="category-icon" />
          <div>
            <span class="category-title">{{ categoryLabel(category) }}</span>
            <span class="category-description">{{ categoryDescription(category) }}</span>
          </div>
          <span class="category-action">Explorar</span>
        </button>
      </div>

      <div class="actions">
        <button type="button" class="start-all" (click)="startWithAll()">Ver todas las categorías</button>
      </div>
    </section>

    <ng-template #resultsView>
      <section class="panel">
        <div class="panel-header">
          <h3>Buscar y filtrar</h3>
          <button type="button" class="change-category" (click)="restartSelection()">
            Cambiar categoría inicial
          </button>
        </div>
        <app-benefit-filters
          [categories]="(facade.availableCategories$ | async) ?? []"
          [types]="(facade.availableTypes$ | async) ?? []"
          (filter)="onFilter($event)"
        />
      </section>

      <section class="panel">
        <h3>Resultados</h3>
        <app-benefit-list [benefits]="(facade.filteredBenefits$ | async) ?? []" />
      </section>
    </ng-template>
  `,
    styles: [
        `
      :host {
        display: grid;
        gap: 1rem;
      }

      .panel {
        background: #ffffff;
        border: 1px solid #e6e8f0;
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 6px 22px rgba(15, 23, 42, 0.05);
      }

      .category-hero {
        background: linear-gradient(145deg, #f7f7ff 0%, #f0f6ff 100%);
        border: 1px solid #dbe3f3;
        border-radius: 1.15rem;
        padding: 1.15rem;
        box-shadow: 0 14px 32px rgba(79, 70, 229, 0.08);
      }

      .eyebrow {
        margin: 0;
        font-size: 0.74rem;
        color: #6366f1;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 800;
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.8rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        color: #111827;
        font-size: 1.16rem;
      }

      .hint {
        margin: -0.15rem 0 1rem;
        color: #475569;
        font-size: 0.94rem;
      }

      .category-grid {
        display: grid;
        gap: 0.72rem;
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      }

      .category-card {
        border: 1px solid #d8dff0;
        border-radius: 1rem;
        padding: 0.8rem;
        background: #ffffff;
        display: grid;
        grid-template-columns: 2.35rem 1fr auto;
        gap: 0.7rem;
        align-items: center;
        text-align: left;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        cursor: pointer;
      }

      .category-card:hover {
        transform: translateY(-2px);
        border-color: #818cf8;
        box-shadow: 0 14px 24px rgba(99, 102, 241, 0.15);
      }

      .category-icon {
        width: 2.35rem;
        height: 2.35rem;
        object-fit: contain;
      }

      .category-title {
        display: block;
        font-size: 0.94rem;
        font-weight: 600;
        color: #1e293b;
        line-height: 1.1;
      }

      .category-description {
        display: block;
        margin-top: 0.2rem;
        font-size: 0.78rem;
        color: #64748b;
        line-height: 1.2;
      }

      .category-action {
        font-size: 0.73rem;
        font-weight: 700;
        color: #4f46e5;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .actions {
        margin-top: 0.9rem;
      }

      .start-all,
      .change-category {
        border: 1px solid #cbd5e1;
        border-radius: 0.75rem;
        background: linear-gradient(145deg, #4338ca, #0284c7);
        color: #ffffff;
        font-size: 0.85rem;
        font-weight: 600;
        padding: 0.52rem 0.85rem;
        cursor: pointer;
      }

      .change-category {
        background: #ffffff;
        color: #334155;
        border-color: #cbd5e1;
      }

      .start-all:hover {
        filter: brightness(1.05);
      }

      .change-category:hover {
        background: #f8fafc;
      }

      @media (max-width: 640px) {
        .category-card {
          grid-template-columns: 2.1rem 1fr;
        }

        .category-action {
          display: none;
        }
      }
    `,
    ]
})
export class BenefitsHomePage implements OnInit {
  readonly facade = inject(BenefitsFacade);
  readonly categoryLabel = getCategoryLabel;

  startedSelection = false;

  ngOnInit(): void {
    this.facade.loadInitialData(getCurrentWeekDay());
  }

  onFilter(filters: BenefitFilters): void {
    this.facade.applyFilters(filters);
  }

  startWithCategory(category: string): void {
    this.startedSelection = true;
    this.facade.applyFilters({ category });
  }

  startWithAll(): void {
    this.startedSelection = true;
    this.facade.applyFilters({});
  }

  restartSelection(): void {
    this.startedSelection = false;
    this.facade.applyFilters({});
  }

  categoryIcon(category: string): string {
    return `assets/illustrations/categories/${category}.svg`;
  }

  categoryDescription(category: string): string {
    const descriptions: Record<string, string> = {
      supermarket: 'Compras del hogar y mercado',
      transport: 'Movilidad, gasolina y viajes',
      restaurant: 'Comidas, cafés y antojos',
      retail: 'Compras y comercios aliados',
      other: 'Beneficios generales y especiales',
    };

    return descriptions[category] ?? 'Descubre oportunidades en esta categoría';
  }
}
