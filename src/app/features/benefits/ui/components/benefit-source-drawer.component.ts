import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Benefit } from '../../domain/models/benefit.model';
import { SourceGroup } from '../../application/services/benefits.facade';
import { getSourceCardSvg } from '../utils/bank-card-svg';
import {
  extractHighlight,
  getCategoryIcon,
  getCategoryLabel,
  getCardTypeLabel,
  benefitTypeStyleMap,
  getSourceColor,
} from '../utils/benefit-labels';

const DAY_ES: Record<string, string> = {
  monday: 'Lun', tuesday: 'Mar', wednesday: 'Mié',
  thursday: 'Jue', friday: 'Vie', saturday: 'Sáb', sunday: 'Dom',
};

@Component({
  selector: 'app-benefit-source-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div
      class="backdrop"
      [class.visible]="isOpen"
      (click)="closed.emit()"
    ></div>

    <!-- Drawer panel -->
    <aside class="drawer" [class.open]="isOpen" role="dialog" aria-modal="true">

      <!-- Drawer header -->
      <div class="drawer-header">
        <span class="drawer-title">{{ group?.source }}</span>
        <button type="button" class="close-btn" (click)="closed.emit()" aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Scroll content -->
      <div class="drawer-body" *ngIf="group">

        <!-- Mini credit card + info -->
        <div class="drawer-card-wrap">
          <div class="drawer-svg" [innerHTML]="cardSvg"></div>
          <div class="drawer-card-info">
            <span class="drawer-bank-name">{{ group.source }}</span>
            <span class="drawer-badge">{{ mainCardTypeLabel }}</span>
          </div>
        </div>

        <!-- Benefits list -->
        <div class="drawer-benefits">
          <ng-container *ngFor="let b of visibleBenefits">
            <a
              [href]="b.termsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="drawer-benefit-row"
            >
              <div class="db-icon" [style.background]="typeLight(b)">
                {{ getCategoryIcon(b.category) }}
              </div>
              <div class="db-text">
                <span class="db-title">{{ b.title }}</span>
                <span class="db-sub">{{ benefitSubText(b) }}</span>
                <div class="db-meta">
                  <span class="db-date" *ngIf="b.activeFrom">
                    Vigencia: {{ formatDate(b.activeFrom) }} – {{ formatDate(b.activeTo) }}
                  </span>
                  <span class="db-days" *ngIf="!b.appliesEveryDay && b.validDays.length">
                    Días: {{ dayLabels(b) }}
                  </span>
                  <span class="db-days" *ngIf="b.appliesEveryDay">
                    Días: Todos los días.
                  </span>
                </div>
              </div>
              <svg class="db-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="#9CA3AF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </ng-container>
        </div>

        <!-- Show more -->
        <button
          type="button"
          class="more-btn"
          *ngIf="group.benefits.length > showLimit"
          (click)="showLimit = group!.benefits.length"
        >
          Más beneficios
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- CTA -->
        <a
          *ngIf="primaryTermsUrl"
          [href]="primaryTermsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn"
        >
          Ver términos y condiciones
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </a>

      </div>
    </aside>
  `,
  styles: [`
    /* BACKDROP */
    .backdrop {
      position: fixed; inset: 0;
      background: rgba(15, 23, 42, 0);
      pointer-events: none;
      z-index: 40;
      transition: background 0.3s;
    }
    .backdrop.visible {
      background: rgba(15, 23, 42, 0.35);
      pointer-events: auto;
    }

    /* DRAWER */
    .drawer {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 400px;
      background: #fff;
      box-shadow: -8px 0 40px rgba(15, 23, 42, 0.12);
      z-index: 50;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
      border-radius: 20px 0 0 20px;
      overflow: hidden;
    }

    .drawer.open {
      transform: translateX(0);
    }

    /* HEADER */
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      flex-shrink: 0;
    }

    .drawer-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #111827;
    }

    .close-btn {
      width: 2rem; height: 2rem;
      display: grid; place-items: center;
      border: none; background: #f3f4f6;
      border-radius: 50%; cursor: pointer;
      color: #6b7280;
      transition: background 0.12s, color 0.12s;
    }
    .close-btn:hover { background: #e5e7eb; color: #111827; }

    /* BODY */
    .drawer-body {
      flex: 1; overflow-y: auto;
      padding: 1.25rem 1.5rem 2rem;
      display: flex; flex-direction: column; gap: 1.25rem;
      scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;
    }

    /* MINI CARD */
    .drawer-card-wrap {
      display: flex; flex-direction: column; gap: 0.85rem;
    }

    .drawer-svg {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 28px rgba(0,0,0,0.15);
    }

    .drawer-svg ::ng-deep svg {
      display: block; width: 100%; height: auto;
    }

    .drawer-card-info {
      display: flex; align-items: center; gap: 0.75rem;
    }

    .drawer-bank-name {
      font-size: 1.15rem; font-weight: 800; color: #111827;
    }

    .drawer-badge {
      font-size: 0.72rem; font-weight: 600;
      background: #f1f5f9; color: #64748b;
      padding: 0.2rem 0.65rem; border-radius: 999px;
    }

    /* BENEFITS */
    .drawer-benefits {
      display: flex; flex-direction: column; gap: 0;
      border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden;
    }

    .drawer-benefit-row {
      display: grid;
      grid-template-columns: 2.4rem 1fr auto;
      gap: 0.75rem;
      align-items: start;
      padding: 0.85rem 1rem;
      text-decoration: none;
      border-bottom: 1px solid #f8fafc;
      transition: background 0.12s;
      cursor: pointer;
    }
    .drawer-benefit-row:last-child { border-bottom: none; }
    .drawer-benefit-row:hover { background: #f8fafc; }

    .db-icon {
      width: 2.4rem; height: 2.4rem; min-width: 2.4rem;
      border-radius: 50%;
      display: grid; place-items: center;
      font-size: 1rem;
    }

    .db-text {
      display: flex; flex-direction: column; gap: 0.15rem;
      min-width: 0;
    }

    .db-title {
      font-size: 0.88rem; font-weight: 700; color: #111827;
      line-height: 1.3;
    }

    .db-sub {
      font-size: 0.78rem; color: #6b7280;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .db-meta {
      display: flex; flex-direction: column; gap: 0.05rem;
      margin-top: 0.2rem;
    }

    .db-date, .db-days {
      font-size: 0.7rem; color: #9ca3af;
    }

    .db-arrow { flex-shrink: 0; margin-top: 0.5rem; }

    /* MORE BTN */
    .more-btn {
      display: flex; align-items: center; justify-content: center; gap: 0.4rem;
      padding: 0.65rem 1rem;
      border: 1.5px solid #e5e7eb;
      border-radius: 10px;
      background: #fff;
      color: #4f46e5; font-size: 0.88rem; font-weight: 600;
      cursor: pointer; transition: background 0.12s, border-color 0.12s;
    }
    .more-btn:hover { background: #f5f3ff; border-color: #c4b5fd; }

    /* CTA */
    .cta-btn {
      display: flex; align-items: center; justify-content: center; gap: 0.4rem;
      padding: 0.8rem 1rem;
      background: #4f46e5; color: #fff;
      border-radius: 12px;
      font-size: 0.9rem; font-weight: 700;
      text-decoration: none;
      transition: filter 0.15s;
      margin-top: auto;
    }
    .cta-btn:hover { filter: brightness(1.1); }

    @media (max-width: 720px) {
      .drawer {
        top: auto;
        left: 0;
        width: 100%;
        max-width: 100vw;
        height: 90vh;
        border-radius: 20px 20px 0 0;
        transform: translateY(100%);
      }
      .drawer.open { transform: translateY(0); }
    }
  `]
})
export class BenefitSourceDrawerComponent implements OnChanges {
  @Input() group: SourceGroup | null = null;
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  readonly getCategoryIcon = getCategoryIcon;

  cardSvg!: SafeHtml;
  showLimit = 3;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.group?.source) {
      const raw = getSourceCardSvg(this.group.source);
      this.cardSvg = this.sanitizer.bypassSecurityTrustHtml(raw);
      this.showLimit = 3;
    }
  }

  get visibleBenefits(): Benefit[] {
    return (this.group?.benefits ?? []).slice(0, this.showLimit);
  }

  get mainCardTypeLabel(): string {
    const types = (this.group?.benefits ?? []).map((b) => b.cardType).filter(Boolean);
    if (!types.length) return 'Tarjeta';
    const freq = types.reduce((acc, t) => { acc[t!] = (acc[t!] ?? 0) + 1; return acc; }, {} as Record<string, number>);
    const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
    return getCardTypeLabel(top);
  }

  get primaryTermsUrl(): string {
    return this.group?.benefits?.[0]?.termsUrl ?? '';
  }

  typeLight(b: Benefit): string {
    return (benefitTypeStyleMap as any)[b.type]?.light ?? '#f1f5f9';
  }

  benefitSubText(b: Benefit): string {
    const match = b.description?.match(/en\s+([\wáéíóúÁÉÍÓÚñÑ,\s]+?)(?:\s+pagando|\s+con\s+[A-Z]|\.)/);
    if (match) return match[1].trim().slice(0, 50);
    return b.description?.slice(0, 50) ?? '';
  }

  formatDate(date: string): string {
    if (!date) return '';
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
  }

  dayLabels(b: Benefit): string {
    return b.validDays.map((d) => DAY_ES[d] ?? d).join(', ');
  }
}
