import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import { BenefitCardComponent } from './benefit-card.component';

@Component({
    selector: 'app-benefit-list',
    imports: [CommonModule, BenefitCardComponent],
    template: `
    <div class="list" *ngIf="benefits.length; else emptyState">
      <app-benefit-card *ngFor="let benefit of pagedBenefits" [benefit]="benefit" />
    </div>

    <nav class="pagination" *ngIf="totalPages > 1">
      <button type="button" (click)="goToPreviousPage()" [disabled]="currentPage === 1">Anterior</button>

      <button
        type="button"
        *ngFor="let page of pages"
        (click)="goToPage(page)"
        [class.active]="page === currentPage"
      >
        {{ page }}
      </button>

      <button type="button" (click)="goToNextPage()" [disabled]="currentPage === totalPages">Siguiente</button>
    </nav>

    <ng-template #emptyState>
      <p class="empty">No hay beneficios para los filtros seleccionados.</p>
    </ng-template>
  `,
    styles: [
        `
      .list {
        display: grid;
        gap: 0.8rem;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        grid-auto-rows: 1fr;
        align-items: stretch;
      }

      app-benefit-card {
        height: 100%;
      }

      .pagination {
        margin-top: 0.85rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        justify-content: center;
      }

      .pagination button {
        border: 1px solid #cbd5e1;
        border-radius: 0.55rem;
        min-width: 2rem;
        padding: 0.3rem 0.55rem;
        background: #ffffff;
        color: #334155;
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
      }

      .pagination button.active {
        background: #4338ca;
        border-color: #4338ca;
        color: #ffffff;
      }

      .pagination button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .empty {
        color: #64748b;
        margin: 0.2rem 0;
      }
    `,
    ]
})
export class BenefitListComponent implements OnChanges {
  @Input() benefits: Benefit[] = [];
  @Input() pageSize = 6;

  currentPage = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['benefits']) {
      this.currentPage = 1;
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.benefits.length / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get pagedBenefits(): Benefit[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.benefits.slice(start, start + this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
