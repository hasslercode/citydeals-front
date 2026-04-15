import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import { SourceGroup } from '../../application/services/benefits.facade';
import {
  extractHighlight,
  getCategoryIcon,
  getCategoryLabel,
  getSourceInitials,
  benefitTypeStyleMap,
} from '../utils/benefit-labels';

// ── Store brand config ────────────────────────────────────────────────────────
interface StoreMeta { gradient: string; category: string; }

const STORE_META: Record<string, StoreMeta> = {
  'Olímpica':
    { gradient: 'linear-gradient(140deg, #6e0f15 0%, #c81425 65%, #e31837 100%)', category: 'Supermercado' },
  'Tarjeta Olímpica':
    { gradient: 'linear-gradient(140deg, #6e0f15 0%, #c81425 65%, #e31837 100%)', category: 'Supermercado' },
  'Terpel':
    { gradient: 'linear-gradient(140deg, #5a2000 0%, #b35600 65%, #f39325 100%)', category: 'Gasolina' },
  'Convenio Policía':
    { gradient: 'linear-gradient(140deg, #011f0e 0%, #034d26 65%, #006341 100%)', category: 'Convenio' },
  'Convenio Policía Nacional':
    { gradient: 'linear-gradient(140deg, #011f0e 0%, #034d26 65%, #006341 100%)', category: 'Convenio' },
};

const DEFAULT_META: StoreMeta = {
  gradient: 'linear-gradient(140deg, #1e293b 0%, #334155 65%, #475569 100%)',
  category: 'Tienda',
};

// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-benefit-store-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="store-card"
      tabindex="0"
      (click)="select.emit(group)"
      (keydown.enter)="select.emit(group)"
      role="button"
      [attr.aria-label]="'Abrir ' + group.source"
    >

      <!-- ── HEADER BAND ─────────────────────────────── -->
      <div class="sc-header" [style.background]="meta.gradient">
        <!-- decorative bg circles -->
        <div class="deco deco-1"></div>
        <div class="deco deco-2"></div>

        <div class="sc-inner">
          <!-- Avatar: rounded square with initials -->
          <div class="sc-avatar">{{ initials }}</div>

          <!-- Name + category -->
          <div class="sc-info">
            <h3 class="sc-name">{{ group.source }}</h3>
            <span class="sc-cat">{{ meta.category }}</span>
          </div>

          <!-- Benefit count bubble (top-right) -->
          <div class="sc-count">
            <span class="sc-count-num">{{ group.benefits.length }}</span>
            <span class="sc-count-label">benef.</span>
          </div>
        </div>
      </div>

      <!-- ── BENEFITS LIST ────────────────────────────── -->
      <div class="sc-body">
        <div class="sc-benefit" *ngFor="let b of topBenefits">
          <div class="b-icon" [style.background]="typeLight(b)">
            {{ getCategoryIcon(b.category) }}
          </div>
          <div class="b-text">
            <span class="b-hl">{{ getHighlight(b) }}</span>
            <span class="b-desc">{{ getDesc(b) }}</span>
          </div>
          <svg class="b-chev" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="#D1D5DB" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Empty -->
        <div class="sc-empty" *ngIf="!topBenefits.length">
          <span>Sin beneficios activos</span>
        </div>
      </div>

      <!-- ── FOOTER ───────────────────────────────────── -->
      <div class="sc-footer">
        <button
          type="button"
          class="see-btn"
          (click)="$event.stopPropagation(); select.emit(group)"
        >
          Ver beneficios
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M4.5 2.5L8.5 6.5L4.5 10.5" stroke="currentColor" stroke-width="1.7"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    /* ── CARD ── */
    .store-card {
      background: #fff;
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      cursor: pointer;
      outline: none;
      box-shadow:
        0 1px 3px rgba(15, 23, 42, 0.05),
        0 4px 16px rgba(15, 23, 42, 0.07);
      transition:
        transform 0.22s cubic-bezier(0.32, 0.72, 0, 1),
        box-shadow 0.22s cubic-bezier(0.32, 0.72, 0, 1);
    }

    .store-card:hover,
    .store-card:focus-visible {
      transform: translateY(-5px);
      box-shadow:
        0 2px 8px rgba(15, 23, 42, 0.06),
        0 12px 36px rgba(15, 23, 42, 0.14);
    }

    /* ── HEADER BAND ── */
    .sc-header {
      position: relative;
      overflow: hidden;
      padding: 1.4rem 1.25rem 1.5rem;
      min-height: 120px;
      display: flex;
      align-items: flex-end;
      flex-shrink: 0;
    }

    /* decorative translucent circles (depth / brand feel) */
    .deco {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.07);
      pointer-events: none;
    }
    .deco-1 { width: 160px; height: 160px; top: -55px; right: -40px; }
    .deco-2 { width: 100px; height: 100px; bottom: -45px; right: 30px; }

    .sc-inner {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 0.9rem;
      width: 100%;
    }

    /* AVATAR */
    .sc-avatar {
      width: 3.2rem;
      height: 3.2rem;
      min-width: 3.2rem;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.18);
      border: 1.5px solid rgba(255, 255, 255, 0.35);
      display: grid;
      place-items: center;
      font-size: 0.95rem;
      font-weight: 900;
      color: #fff;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }

    /* NAME + CATEGORY */
    .sc-info { flex: 1; min-width: 0; }

    .sc-name {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 800;
      color: #fff;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sc-cat {
      display: inline-block;
      margin-top: 0.25rem;
      font-size: 0.72rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.82);
      background: rgba(255, 255, 255, 0.14);
      padding: 0.18rem 0.6rem;
      border-radius: 999px;
      letter-spacing: 0.02em;
    }

    /* BENEFIT COUNT bubble */
    .sc-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }

    .sc-count-num {
      font-size: 1.4rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.95);
      line-height: 1;
    }

    .sc-count-label {
      font-size: 0.65rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.65);
      letter-spacing: 0.04em;
    }

    /* ── BENEFITS BODY ── */
    .sc-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0.1rem 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .sc-benefit {
      display: grid;
      grid-template-columns: 2.2rem 1fr auto;
      gap: 0.55rem;
      align-items: center;
      padding: 0.65rem 1.2rem;
      border-bottom: 1px solid #f8fafc;
      transition: background 0.12s;
    }

    .sc-benefit:last-child { border-bottom: none; }
    .sc-benefit:hover { background: #fafbff; }

    .b-icon {
      width: 2.2rem;
      height: 2.2rem;
      min-width: 2.2rem;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 0.88rem;
    }

    .b-text {
      display: flex;
      flex-direction: column;
      gap: 0.06rem;
      min-width: 0;
    }

    .b-hl {
      font-size: 0.84rem;
      font-weight: 700;
      color: #111827;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .b-desc {
      font-size: 0.71rem;
      color: #9ca3af;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .b-chev { flex-shrink: 0; }

    .sc-empty {
      padding: 1rem 1.2rem;
      font-size: 0.8rem;
      color: #9ca3af;
      text-align: center;
    }

    /* ── FOOTER ── */
    .sc-footer {
      padding: 0.7rem 1.2rem 0.8rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .see-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      border: none;
      background: none;
      font-size: 0.84rem;
      font-weight: 700;
      color: #4f46e5;
      cursor: pointer;
      padding: 0;
      transition: color 0.12s;
    }

    .see-btn:hover { color: #3730a3; }
  `]
})
export class BenefitStoreCardComponent {
  @Input({ required: true }) group!: SourceGroup;
  @Output() select = new EventEmitter<SourceGroup>();

  readonly getCategoryIcon = getCategoryIcon;

  get meta(): StoreMeta {
    return STORE_META[this.group.source] ?? DEFAULT_META;
  }

  get initials(): string {
    return getSourceInitials(this.group.source);
  }

  get topBenefits(): Benefit[] {
    return this.group.benefits.filter((b) => b.type !== 'info').slice(0, 3);
  }

  typeLight(b: Benefit): string {
    return (benefitTypeStyleMap as any)[b.type]?.light ?? '#f1f5f9';
  }

  getHighlight(b: Benefit): string {
    const hl = extractHighlight(b.title);
    return hl ? `${hl} en ${getCategoryLabel(b.category)}` : b.title.slice(0, 30);
  }

  getDesc(b: Benefit): string {
    const hl = extractHighlight(b.title);
    if (!hl) return b.description.slice(0, 40);
    const after = b.title.slice(b.title.indexOf(hl) + hl.length).trim();
    return after.slice(0, 40) || b.description.slice(0, 40);
  }
}
