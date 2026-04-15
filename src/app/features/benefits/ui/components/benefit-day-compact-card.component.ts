import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import {
  extractHighlight,
  getCategoryIcon,
  benefitTypeStyleMap,
} from '../utils/benefit-labels';

@Component({
  selector: 'app-benefit-day-compact-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="cc"
      tabindex="0"
      role="button"
      (click)="select.emit(benefit)"
      (keydown.enter)="select.emit(benefit)"
      [attr.aria-label]="benefit.title"
    >
      <!-- Category icon -->
      <div class="cc-icon" [style.background]="ts.light">
        {{ getCategoryIcon(benefit.category) }}
      </div>

      <!-- Text -->
      <div class="cc-body">
        <span class="cc-title">
          {{ benefit.title | slice:0:42 }}{{ benefit.title.length > 42 ? '…' : '' }}
        </span>
        <span class="cc-src">{{ benefit.source }}</span>
      </div>

      <!-- Value badge or type label -->
      <div class="cc-badge"
        [style.background]="ts.light"
        [style.color]="ts.primary">
        {{ hl || typeShort }}
      </div>

      <!-- Chevron -->
      <svg class="cc-chev" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3L9 7L5 11" stroke="#D1D5DB" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </article>
  `,
  styles: [`
    :host { display: block; }

    .cc {
      display: grid;
      grid-template-columns: 2.35rem 1fr auto auto;
      align-items: center;
      gap: 0.7rem;
      padding: 0.75rem 0.9rem;
      background: #fff;
      border-radius: 14px;
      cursor: pointer;
      outline: none;
      box-shadow:
        0 1px 3px rgba(15, 23, 42, 0.04),
        0 3px 10px rgba(15, 23, 42, 0.06);
      transition:
        transform .18s cubic-bezier(.32,.72,0,1),
        box-shadow .18s ease;
    }

    .cc:hover,
    .cc:focus-visible {
      transform: translateY(-2px);
      box-shadow:
        0 2px 8px rgba(15, 23, 42, 0.07),
        0 8px 24px rgba(15, 23, 42, 0.10);
    }

    .cc-icon {
      width: 2.35rem;
      height: 2.35rem;
      min-width: 2.35rem;
      border-radius: 10px;
      display: grid;
      place-items: center;
      font-size: 0.95rem;
    }

    .cc-body {
      display: flex;
      flex-direction: column;
      gap: 0.08rem;
      min-width: 0;
    }

    .cc-title {
      font-size: 0.83rem;
      font-weight: 700;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cc-src {
      font-size: 0.7rem;
      color: #9ca3af;
      font-weight: 500;
    }

    .cc-badge {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.18rem 0.55rem;
      border-radius: 999px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .cc-chev { flex-shrink: 0; }
  `],
})
export class BenefitDayCompactCardComponent {
  @Input({ required: true }) benefit!: Benefit;
  @Output() select = new EventEmitter<Benefit>();

  readonly getCategoryIcon = getCategoryIcon;

  get ts() {
    return (
      (benefitTypeStyleMap as any)[this.benefit.type] ?? {
        light: '#f1f5f9',
        primary: '#64748b',
      }
    );
  }

  get hl(): string {
    return extractHighlight(this.benefit.title);
  }

  get typeShort(): string {
    const map: Record<string, string> = {
      discount: 'Dto.',
      cashback: 'CB',
      opportunity: 'Opp.',
    };
    return map[this.benefit.type] ?? '';
  }
}
