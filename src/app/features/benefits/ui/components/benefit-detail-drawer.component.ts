import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import {
  getCategoryIcon,
  getCategoryLabel,
  benefitTypeStyleMap,
  benefitTypeLabelMap,
} from '../utils/benefit-labels';

const DAY_ES: Record<string, string> = {
  monday: 'Lun',
  tuesday: 'Mar',
  wednesday: 'Mié',
  thursday: 'Jue',
  friday: 'Vie',
  saturday: 'Sáb',
  sunday: 'Dom',
};

@Component({
  selector: 'app-benefit-detail-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div
      class="backdrop"
      [class.visible]="isOpen"
      (click)="closed.emit()"
      aria-hidden="true"
    ></div>

    <!-- Drawer panel -->
    <aside
      class="drawer"
      [class.open]="isOpen"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="benefit?.title ?? 'Detalle del beneficio'"
    >
      <!-- ── Header ── -->
      <div class="dh">
        <div class="dh-left" *ngIf="benefit">
          <span class="dh-src">{{ benefit.source }}</span>
          <span
            class="dh-type"
            [style.background]="ts?.light"
            [style.color]="ts?.primary"
          >{{ typeLabel }}</span>
        </div>
        <button
          type="button"
          class="close-btn"
          (click)="closed.emit()"
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <!-- ── Body ── -->
      <div class="db" *ngIf="benefit">

        <!-- Category strip -->
        <div class="db-cat">
          <div class="db-cat-icon" [style.background]="ts?.light">
            {{ getCategoryIcon(benefit.category) }}
          </div>
          <span class="db-cat-lbl">{{ getCategoryLabel(benefit.category) }}</span>
        </div>

        <!-- Title -->
        <h2 class="db-title">{{ benefit.title }}</h2>

        <!-- Description -->
        <p class="db-desc">{{ benefit.description }}</p>

        <!-- Meta card -->
        <div class="db-meta">

          <!-- Vigencia -->
          <div class="db-row" *ngIf="benefit.activeFrom">
            <span class="db-lbl">Vigencia</span>
            <span class="db-val">
              {{ fmt(benefit.activeFrom) }} – {{ fmt(benefit.activeTo) }}
            </span>
          </div>

          <!-- Days: applies every day -->
          <div class="db-row" *ngIf="benefit.appliesEveryDay">
            <span class="db-lbl">Días válidos</span>
            <span class="db-val">Todos los días</span>
          </div>

          <!-- Days: specific days -->
          <div class="db-row" *ngIf="!benefit.appliesEveryDay && benefit.validDays.length">
            <span class="db-lbl">Días válidos</span>
            <div class="db-days">
              <span
                class="db-day"
                *ngFor="let d of benefit.validDays"
              >{{ dayShort(d) }}</span>
            </div>
          </div>

        </div>

        <!-- CTA -->
        <a
          *ngIf="benefit.termsUrl"
          [href]="benefit.termsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="db-cta"
        >
          Ver términos y condiciones
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4.5 2.5h7v7M11.5 2.5L2.5 11.5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </a>

      </div>
    </aside>
  `,
  styles: [`
    /* ── Backdrop ── */
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0);
      z-index: 200;
      pointer-events: none;
      transition: background 0.3s ease;
    }
    .backdrop.visible {
      background: rgba(15, 23, 42, 0.42);
      pointer-events: all;
    }

    /* ── Drawer ── */
    .drawer {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 420px;
      max-width: 100vw;
      background: #fff;
      border-radius: 20px 0 0 20px;
      box-shadow: -8px 0 52px rgba(15, 23, 42, 0.16);
      z-index: 201;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
      overflow: hidden;
    }
    .drawer.open { transform: translateX(0); }

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

    /* ── Header ── */
    .dh {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.4rem 1.5rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      flex-shrink: 0;
    }
    .dh-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .dh-src {
      font-size: 0.8rem;
      font-weight: 700;
      color: #374151;
      background: #f1f5f9;
      border-radius: 999px;
      padding: 0.22rem 0.7rem;
    }
    .dh-type {
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 999px;
      padding: 0.22rem 0.7rem;
    }
    .close-btn {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      border: none;
      background: #f8fafc;
      color: #6b7280;
      cursor: pointer;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      transition: background 0.12s, color 0.12s;
    }
    .close-btn:hover { background: #f1f5f9; color: #111827; }

    /* ── Body ── */
    .db {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.15rem;
    }

    .db-cat {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .db-cat-icon {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .db-cat-lbl {
      font-size: 0.85rem;
      font-weight: 600;
      color: #4b5563;
    }

    .db-title {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.35;
      letter-spacing: -0.02em;
    }

    .db-desc {
      margin: 0;
      font-size: 0.88rem;
      color: #4b5563;
      line-height: 1.65;
    }

    .db-meta {
      background: #f8fafc;
      border-radius: 14px;
      padding: 1rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .db-row { display: flex; flex-direction: column; gap: 0.22rem; }
    .db-lbl {
      font-size: 0.7rem;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .db-val {
      font-size: 0.88rem;
      font-weight: 600;
      color: #1e293b;
    }
    .db-days {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }
    .db-day {
      font-size: 0.76rem;
      font-weight: 700;
      color: #374151;
      background: #e9ecef;
      border-radius: 999px;
      padding: 0.16rem 0.6rem;
    }

    .db-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      background: #0f172a;
      color: #fff;
      font-size: 0.88rem;
      font-weight: 700;
      text-decoration: none;
      align-self: flex-start;
      transition: background 0.15s, transform 0.15s;
      margin-top: auto;
    }
    .db-cta:hover {
      background: #1e293b;
      transform: translateY(-1px);
    }
  `],
})
export class BenefitDetailDrawerComponent {
  @Input() benefit: Benefit | null = null;
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  readonly getCategoryIcon = getCategoryIcon;
  readonly getCategoryLabel = getCategoryLabel;

  get ts() {
    if (!this.benefit) return null;
    return (benefitTypeStyleMap as any)[this.benefit.type] ?? null;
  }

  get typeLabel(): string {
    if (!this.benefit) return '';
    return (benefitTypeLabelMap as any)[this.benefit.type] ?? this.benefit.type;
  }

  dayShort(d: string): string {
    return DAY_ES[d] ?? d;
  }

  fmt(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    return `${d} ${months[m - 1]} ${y}`;
  }
}
