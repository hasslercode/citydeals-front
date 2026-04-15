import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import {
  extractHighlight,
  getCategoryIcon,
  getCategoryLabel,
  benefitTypeStyleMap,
} from '../utils/benefit-labels';

@Component({
  selector: 'app-benefit-day-hero-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="hc"
      tabindex="0"
      role="button"
      (click)="select.emit(benefit)"
      (keydown.enter)="select.emit(benefit)"
      [attr.aria-label]="benefit.title"
    >
      <!-- Full-bleed gradient -->
      <div class="hc-bg" [style.background]="ts.gradient"></div>
      <!-- Decorative circles -->
      <div class="hc-deco hc-d1"></div>
      <div class="hc-deco hc-d2"></div>

      <div class="hc-inner">

        <!-- Category badge -->
        <div class="hc-cat">
          <span>{{ getCategoryIcon(benefit.category) }}</span>
          <span>{{ getCategoryLabel(benefit.category) }}</span>
        </div>

        <!-- Big highlight -->
        <div class="hc-hl" *ngIf="hl; else fullTitle">{{ hl }}</div>
        <ng-template #fullTitle>
          <div class="hc-full">{{ benefit.title | slice:0:36 }}</div>
        </ng-template>

        <!-- Context / subtitle -->
        <div class="hc-sub" *ngIf="hl && ctx">{{ ctx }}</div>

        <!-- Footer: source + arrow -->
        <div class="hc-foot">
          <span class="hc-source">{{ benefit.source }}</span>
          <svg class="hc-arr" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8h9M9 4l4 4-4 4" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

      </div>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .hc {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 210px;
      border-radius: 20px;
      cursor: pointer;
      outline: none;
      box-shadow:
        0 2px 8px rgba(15, 23, 42, 0.07),
        0 8px 28px rgba(15, 23, 42, 0.09);
      transition:
        transform .22s cubic-bezier(.32,.72,0,1),
        box-shadow .22s ease;
    }

    .hc:hover,
    .hc:focus-visible {
      transform: translateY(-7px);
      box-shadow:
        0 4px 16px rgba(15, 23, 42, 0.10),
        0 22px 56px rgba(15, 23, 42, 0.20);
    }

    .hc-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .hc-deco {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      pointer-events: none;
      z-index: 1;
    }
    .hc-d1 { width: 200px; height: 200px; top: -75px; right: -55px; }
    .hc-d2 { width: 120px; height: 120px; bottom: -40px; left: -30px; }

    .hc-inner {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1.35rem 1.35rem 1.15rem;
      height: 100%;
    }

    /* Category pill */
    .hc-cat {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      align-self: flex-start;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 999px;
      padding: 0.2rem 0.7rem;
      font-size: 0.71rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.92);
    }

    /* Big % or amount */
    .hc-hl {
      font-size: 3.2rem;
      font-weight: 900;
      color: #fff;
      line-height: 1;
      letter-spacing: -0.05em;
      text-shadow: 0 2px 14px rgba(0, 0, 0, 0.22);
      margin-top: 0.2rem;
    }

    /* Full title when no highlight */
    .hc-full {
      font-size: 1.15rem;
      font-weight: 800;
      color: #fff;
      line-height: 1.3;
      text-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
      margin-top: 0.35rem;
    }

    /* Context text */
    .hc-sub {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      line-height: 1.4;
      max-width: 88%;
    }

    /* Footer */
    .hc-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 0.6rem;
    }

    .hc-source {
      font-size: 0.72rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      padding: 0.18rem 0.65rem;
    }

    .hc-arr {
      color: rgba(255, 255, 255, 0.8);
      transition: transform .15s;
    }
    .hc:hover .hc-arr { transform: translateX(3px); }
  `],
})
export class BenefitDayHeroCardComponent {
  @Input({ required: true }) benefit!: Benefit;
  @Output() select = new EventEmitter<Benefit>();

  readonly getCategoryIcon = getCategoryIcon;
  readonly getCategoryLabel = getCategoryLabel;

  get ts() {
    return (
      (benefitTypeStyleMap as any)[this.benefit.type] ?? {
        gradient: 'linear-gradient(135deg,#4f46e5 0%,#3730a3 100%)',
        light: '#ede9fe',
        primary: '#4f46e5',
      }
    );
  }

  get hl(): string {
    return extractHighlight(this.benefit.title);
  }

  get ctx(): string {
    const h = this.hl;
    if (!h) return '';
    const idx = this.benefit.title.indexOf(h);
    const after = this.benefit.title.slice(idx + h.length).trim();
    return (after || this.benefit.description).slice(0, 48);
  }
}
