import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import { BenefitCardComponent } from './benefit-card.component';

@Component({
  selector: 'app-benefit-list',
  standalone: true,
  imports: [CommonModule, BenefitCardComponent],
  template: `
    <div class="list" *ngIf="pagedBenefits.length; else emptyState">
      <app-benefit-card *ngFor="let benefit of pagedBenefits" [benefit]="benefit" />
    </div>

    <nav class="pagination" *ngIf="totalPages > 1">
      <button type="button" (click)="goToPreviousPage()" [disabled]="currentPage === 1">‹</button>
      <button *ngFor="let page of pages" type="button" (click)="goToPage(page)"
        [class.active]="page === currentPage">{{ page }}</button>
      <button type="button" (click)="goToNextPage()" [disabled]="currentPage === totalPages">›</button>
    </nav>

    <ng-template #emptyState>
      <div class="empty">
        <span class="empty-icon">🔍</span>
        <p>No hay beneficios para los filtros seleccionados.</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .list {
      display: grid;
      gap: 0.85rem;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }

    .pagination {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      justify-content: center;
    }

    .pagination button {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      min-width: 2rem;
      padding: 0.3rem 0.55rem;
      background: #fff;
      color: #374151;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.14s;
    }

    .pagination button:hover:not(:disabled) { background: #f3f4f6; border-color: #6366f1; }
    .pagination button.active { background: #4f46e5; color: #fff; border-color: #4f46e5; font-weight: 700; }
    .pagination button:disabled { opacity: 0.4; cursor: not-allowed; }

    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 3rem 1rem;
      color: #9ca3af;
      text-align: center;
    }

    .empty-icon { font-size: 2.5rem; }
    .empty p { margin: 0; font-size: 0.9rem; }
  `]
})
export class BenefitListComponent implements OnChanges {
  @Input() benefits: Benefit[] = [];

  readonly pageSize = 12;
  currentPage = 1;
  pagedBenefits: Benefit[] = [];

  get totalPages(): number { return Math.ceil(this.benefits.length / this.pageSize); }
  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['benefits']) { this.currentPage = 1; this.updatePage(); }
  }

  goToPage(page: number): void { this.currentPage = page; this.updatePage(); }
  goToPreviousPage(): void { if (this.currentPage > 1) { this.currentPage--; this.updatePage(); } }
  goToNextPage(): void { if (this.currentPage < this.totalPages) { this.currentPage++; this.updatePage(); } }

  private updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedBenefits = this.benefits.slice(start, start + this.pageSize);
  }
}
