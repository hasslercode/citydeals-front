import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Benefit } from '../../domain/models/benefit.model';
import { SourceGroup } from '../../application/services/benefits.facade';
import {
  extractHighlight,
  getCategoryIcon,
  getCategoryLabel,
  benefitTypeStyleMap,
} from '../utils/benefit-labels';
import { getSourceCardSvg } from '../utils/bank-card-svg';

@Component({
  selector: 'app-benefit-source-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="source-card" (click)="select.emit(group)" tabindex="0"
      (keydown.enter)="select.emit(group)">

      <!-- SVG credit card face -->
      <div class="card-face" [innerHTML]="cardSvg"></div>

      <!-- Benefits list -->
      <div class="card-body">
        <div class="benefit-list">
          <div class="benefit-row" *ngFor="let b of topBenefits">
            <div class="b-icon" [style.background]="typeLight(b)">{{ getCategoryIcon(b.category) }}</div>
            <div class="b-text">
              <span class="b-hl">{{ getHighlight(b) }}</span>
              <span class="b-desc">{{ getDesc(b) }}</span>
            </div>
            <svg class="b-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="#D1D5DB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="card-footer">
          <span class="count-badge">{{ group.benefits.length }} beneficio{{ group.benefits.length !== 1 ? 's' : '' }}</span>
          <button type="button" class="see-btn" (click)="$event.stopPropagation(); select.emit(group)">
            Ver beneficios
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M4.5 2.5L8.5 6.5L4.5 10.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .source-card {
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.07);
      display: flex;
      flex-direction: column;
      height: 100%;
      cursor: pointer;
      outline: none;
      transition: transform 0.2s cubic-bezier(0.32,0.72,0,1),
                  box-shadow 0.2s cubic-bezier(0.32,0.72,0,1);
    }

    .source-card:hover, .source-card:focus-visible {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(15,23,42,0.14);
    }

    /* CARD FACE */
    .card-face {
      width: 100%;
      aspect-ratio: 400 / 252;
      overflow: hidden;
      border-radius: 16px 16px 0 0;
      line-height: 0;
      flex-shrink: 0;
    }

    .card-face ::ng-deep svg {
      width: 100%; height: 100%; display: block;
    }

    /* BODY */
    .card-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 0;
    }

    .benefit-list {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .benefit-row {
      display: grid;
      grid-template-columns: 2rem 1fr auto;
      gap: 0.55rem;
      align-items: center;
      padding: 0.6rem 0.9rem;
      border-bottom: 1px solid #f8fafc;
    }

    .benefit-row:last-child { border-bottom: none; }

    .b-icon {
      width: 2rem; height: 2rem;
      border-radius: 50%;
      display: grid; place-items: center;
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .b-text {
      display: flex; flex-direction: column; gap: 0.05rem; min-width: 0;
    }

    .b-hl {
      font-size: 0.82rem; font-weight: 700; color: #111827;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .b-desc {
      font-size: 0.71rem; color: #9ca3af;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .b-arrow { flex-shrink: 0; }

    /* FOOTER */
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.65rem 0.9rem 0.75rem;
      border-top: 1px solid #f1f5f9;
    }

    .count-badge {
      font-size: 0.72rem; color: #9ca3af; font-weight: 500;
    }

    .see-btn {
      display: inline-flex; align-items: center; gap: 0.3rem;
      border: none; background: none;
      font-size: 0.82rem; font-weight: 600; color: #4f46e5;
      cursor: pointer; padding: 0;
      transition: color 0.12s;
    }
    .see-btn:hover { color: #3730a3; }
  `]
})
export class BenefitSourceCardComponent implements OnChanges {
  @Input({ required: true }) group!: SourceGroup;
  @Output() select = new EventEmitter<SourceGroup>();

  readonly getCategoryIcon = getCategoryIcon;
  cardSvg!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    const raw = getSourceCardSvg(this.group?.source ?? '');
    this.cardSvg = this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  get topBenefits(): Benefit[] {
    return this.group.benefits.filter((b) => b.type !== 'info').slice(0, 2);
  }

  typeLight(b: Benefit): string {
    return (benefitTypeStyleMap as any)[b.type]?.light ?? '#f1f5f9';
  }

  getHighlight(b: Benefit): string {
    const hl = extractHighlight(b.title);
    const label = getCategoryLabel(b.category);
    return hl ? `${hl} en ${label}` : b.title.slice(0, 30);
  }

  getDesc(b: Benefit): string {
    const hl = extractHighlight(b.title);
    if (!hl) return b.description.slice(0, 36);
    const after = b.title.slice(b.title.indexOf(hl) + hl.length).trim();
    return after.slice(0, 36) || b.description.slice(0, 36);
  }
}
