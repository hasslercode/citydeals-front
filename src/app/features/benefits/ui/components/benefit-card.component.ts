import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import { getCurrentWeekDay } from '../../../../shared/utils/day.utils';
import {
  benefitTypeLabelMap,
  benefitTypeStyleMap,
  extractHighlight,
  getCategoryLabel,
  getSourceColor,
  getSourceInitials,
} from '../utils/benefit-labels';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="mini-card">
      <header class="card-header">
        <div class="source-avatar" [style.background]="sourceColor">
          {{ sourceInitials }}
        </div>
        <div class="source-info">
          <span class="source-name">{{ benefit.source }}</span>
          <span class="type-badge" [style.color]="typeColor" [style.background]="typeBg">
            {{ typeLabel }}
          </span>
        </div>
      </header>

      <div class="card-body">
        <div class="highlight-row" *ngIf="highlight">
          <span class="highlight-value" [style.color]="typeColor">{{ highlight }}</span>
        </div>
        <p class="description">{{ benefit.title }}</p>
      </div>

      <footer class="card-footer">
        <a [href]="benefit.termsUrl" target="_blank" rel="noopener noreferrer" class="link-more">
          Ver más >
        </a>
        <a [href]="benefit.termsUrl" target="_blank" rel="noopener noreferrer"
          class="btn-more" [style.background]="typeColor">
          Ver más
        </a>
      </footer>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .mini-card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      height: 100%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: box-shadow 0.2s, transform 0.2s;
    }

    .mini-card:hover {
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .source-avatar {
      width: 2.4rem;
      height: 2.4rem;
      min-width: 2.4rem;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 0.65rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 0.02em;
    }

    .source-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      min-width: 0;
    }

    .source-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type-badge {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 0.1rem 0.45rem;
      border-radius: 999px;
      width: fit-content;
    }

    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .highlight-row {
      display: flex;
      align-items: baseline;
      gap: 0.3rem;
    }

    .highlight-value {
      font-size: 1.5rem;
      font-weight: 900;
      line-height: 1;
    }

    .description {
      margin: 0;
      font-size: 0.8rem;
      color: #4b5563;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: auto;
    }

    .link-more {
      font-size: 0.78rem;
      color: #6b7280;
      text-decoration: none;
      font-weight: 500;
    }

    .link-more:hover { color: #374151; text-decoration: underline; }

    .btn-more {
      margin-left: auto;
      color: #fff;
      font-size: 0.76rem;
      font-weight: 600;
      padding: 0.3rem 0.85rem;
      border-radius: 999px;
      text-decoration: none;
      transition: filter 0.15s;
    }

    .btn-more:hover { filter: brightness(1.1); }
  `]
})
export class BenefitCardComponent {
  @Input({ required: true }) benefit!: Benefit;

  get sourceColor(): string { return getSourceColor(this.benefit.source); }
  get sourceInitials(): string { return getSourceInitials(this.benefit.source); }
  get typeLabel(): string { return benefitTypeLabelMap[this.benefit.type] ?? this.benefit.type; }
  get typeColor(): string { return benefitTypeStyleMap[this.benefit.type]?.primary ?? '#64748b'; }
  get typeBg(): string { return benefitTypeStyleMap[this.benefit.type]?.light ?? '#f1f5f9'; }
  get highlight(): string { return extractHighlight(this.benefit.title); }
}
