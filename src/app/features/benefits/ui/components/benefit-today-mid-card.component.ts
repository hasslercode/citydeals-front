import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import {
  extractHighlight,
  getCategoryIcon,
  getCategoryLabel,
  benefitTypeStyleMap,
  benefitTypeLabelMap,
} from '../utils/benefit-labels';

@Component({
  selector: 'app-benefit-today-mid-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="mc"
      tabindex="0"
      role="button"
      (click)="select.emit(benefit)"
      (keydown.enter)="select.emit(benefit)"
      [attr.aria-label]="benefit.title"
    >
      <!-- ── Header band ── -->
      <div class="mc-header" [style.background]="ts.light">
        <!-- Category icon square -->
        <div class="mc-icon" [style.background]="ts.gradient">
          {{ getCategoryIcon(benefit.category) }}
        </div>
        <!-- Type label pill -->
        <span class="mc-type" [style.color]="ts.primary">
          {{ typeLabel }}
        </span>
      </div>

      <!-- ── Body ── -->
      <div class="mc-body">
        <!-- Big value -->
        <div class="mc-hl" *ngIf="hl" [style.color]="ts.primary">{{ hl }}</div>
        <!-- Title or context -->
        <p class="mc-title">{{ titleText }}</p>
      </div>

      <!-- ── Footer ── -->
      <div class="mc-foot">
        <span class="mc-src">{{ benefit.source }}</span>
        <svg class="mc-arr" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .mc {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #fff;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      outline: none;
      box-shadow:
        0 1px 3px rgba(15, 23, 42, 0.05),
        0 4px 14px rgba(15, 23, 42, 0.08);
      transition:
        transform .22s cubic-bezier(.32,.72,0,1),
        box-shadow .22s ease;
    }

    .mc:hover,
    .mc:focus-visible {
      transform: translateY(-5px);
      box-shadow:
        0 3px 12px rgba(15, 23, 42, 0.09),
        0 16px 40px rgba(15, 23, 42, 0.14);
    }

    /* ── HEADER ── */
    .mc-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.85rem 1rem 0.7rem;
      flex-shrink: 0;
    }

    .mc-icon {
      width: 2.4rem;
      height: 2.4rem;
      min-width: 2.4rem;
      border-radius: 11px;
      display: grid;
      place-items: center;
      font-size: 1rem;
    }

    .mc-type {
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* ── BODY ── */
    .mc-body {
      flex: 1;
      padding: 0.1rem 1rem 0.65rem;
      display: flex;
      flex-direction: column;
      gap: 0.22rem;
    }

    .mc-hl {
      font-size: 2.4rem;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.05em;
    }

    .mc-title {
      margin: 0;
      font-size: 0.8rem;
      font-weight: 600;
      color: #374151;
      line-height: 1.45;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── FOOTER ── */
    .mc-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem 0.75rem;
      border-top: 1px solid #f1f5f9;
    }

    .mc-src {
      font-size: 0.72rem;
      font-weight: 700;
      color: #6b7280;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .mc-arr {
      color: #d1d5db;
      flex-shrink: 0;
      transition: transform .14s;
    }
    .mc:hover .mc-arr { transform: translateX(3px); color: #9ca3af; }
  `],
})
export class BenefitTodayMidCardComponent {
  @Input({ required: true }) benefit!: Benefit;
  @Output() select = new EventEmitter<Benefit>();

  readonly getCategoryIcon = getCategoryIcon;
  readonly getCategoryLabel = getCategoryLabel;

  get ts() {
    return (
      (benefitTypeStyleMap as any)[this.benefit.type] ?? {
        primary: '#4f46e5',
        light: '#eef2ff',
        gradient: 'linear-gradient(135deg,#4f46e5 0%,#3730a3 100%)',
      }
    );
  }

  get hl(): string {
    return extractHighlight(this.benefit.title);
  }

  get typeLabel(): string {
    return (benefitTypeLabelMap as any)[this.benefit.type] ?? this.benefit.type;
  }

  /** Context text shown under the highlight value, or the title when no highlight */
  get titleText(): string {
    const h = this.hl;
    if (!h) return this.benefit.title.slice(0, 55);
    // Show meaningful context from item title
    const idx = this.benefit.title.indexOf(h);
    const after = this.benefit.title.slice(idx + h.length).trim();
    return after.slice(0, 50) || this.benefit.description.slice(0, 50);
  }
}
