import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Benefit, WeekDay } from '../../domain/models/benefit.model';
import { BenefitType } from '../../domain/enums/benefit-type.enum';
import { getCurrentWeekDay } from '../../../../shared/utils/day.utils';
import {
  benefitTypeLabelMap,
  getCategoryLabel,
} from '../utils/benefit-labels';

const dayMap: Record<string, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

@Component({
    selector: 'app-benefit-card',
  imports: [CommonModule],
    template: `
    <article class="benefit-card">
      <header class="card-top" [ngClass]="topClass">
        <div class="badge">{{ labelByType[benefit.type] }}</div>
        <div class="top-content">
          <img [src]="illustrationPath" [alt]="benefit.type" class="icon-main" />
          <h3>{{ benefit.title }}</h3>
        </div>
        <img [src]="illustrationPath" [alt]="''" class="icon-bg" aria-hidden="true" />
      </header>

      <section class="card-body">
        <p>{{ benefit.description }}</p>
        <footer>
          <span class="today-indicator" [ngClass]="appliesToday ? 'today-yes' : 'today-no'">
            {{ appliesToday ? 'Aplica hoy' : 'No aplica hoy' }}
          </span>
          <span><strong>Fuente:</strong> {{ benefit.source }}</span>
          <span><strong>Categoría:</strong> {{ categoryLabel }}</span>
          <span><strong>Vigencia:</strong> {{ activeRangeLabel }}</span>
          <span><strong>Días:</strong> {{ displayDays }}</span>
          <a [href]="benefit.termsUrl" target="_blank" rel="noopener noreferrer">Términos y condiciones</a>
        </footer>
      </section>
    </article>
  `,
    styles: [
        `
      :host {
        display: block;
        height: 100%;
      }

      .benefit-card {
        background: #ffffff;
        border: 1px solid #d8deeb;
        border-radius: 0.78rem;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
        display: grid;
        grid-template-rows: auto 1fr;
        height: 100%;
      }

      .card-top {
        position: relative;
        padding: 0.56rem 0.66rem 0.62rem;
        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      }

      .badge {
        width: fit-content;
        color: #ffffff;
        border-radius: 999px;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        font-weight: 700;
        padding: 0.16rem 0.55rem;
        margin-bottom: 0.46rem;
        position: relative;
        z-index: 2;
      }

      .top-content {
        display: grid;
        grid-template-columns: 2.25rem 1fr;
        gap: 0.55rem;
        align-items: center;
        position: relative;
        z-index: 2;
      }

      .icon-main {
        width: 2.25rem;
        height: 2.25rem;
        object-fit: contain;
      }

      .icon-bg {
        position: absolute;
        right: -0.35rem;
        top: 0.35rem;
        width: 3.5rem;
        height: 3.5rem;
        opacity: 0.2;
        object-fit: contain;
        filter: grayscale(0.1);
      }

      h3 {
        margin: 0;
        line-height: 1.12;
        font-size: 1.04rem;
        color: #1f2937;
      }

      .card-body {
        padding: 0.78rem 0.8rem 0.84rem;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 0.56rem;
      }

      p {
        margin: 0;
        color: #374151;
        font-size: 0.85rem;
        line-height: 1.3;
      }

      footer {
        margin-top: auto;
        display: grid;
        gap: 0.2rem;
        font-size: 0.84rem;
        color: #111827;
      }

      a {
        margin-top: 0.15rem;
        width: fit-content;
        font-size: 0.8rem;
        font-weight: 600;
        color: #2563eb;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      strong {
        color: #0f172a;
      }

      .today-indicator {
        width: fit-content;
        border-radius: 999px;
        font-size: 0.73rem;
        padding: 0.12rem 0.5rem;
        font-weight: 700;
        margin-bottom: 0.08rem;
      }

      .today-yes {
        background: #dcfce7;
        color: #166534;
      }

      .today-no {
        background: #fee2e2;
        color: #991b1b;
      }

      .top-discount {
        background: linear-gradient(90deg, #d8f2dc 0%, #c3ebcb 100%);

        .badge {
          background: #2ea94f;
        }
      }

      .top-cashback {
        background: linear-gradient(90deg, #f7e9c6 0%, #f4dc9f 100%);

        .badge {
          background: #e59e1a;
        }
      }

      .top-opportunity {
        background: linear-gradient(90deg, #ead9f8 0%, #e0cbf5 100%);

        .badge {
          background: #7c3aed;
        }
      }

      .top-info {
        background: linear-gradient(90deg, #d6e9ff 0%, #c5dfff 100%);

        .badge {
          background: #2563eb;
        }
      }
    `,
    ]
})
export class BenefitCardComponent {
  @Input() benefit!: Benefit;

  readonly labelByType: Record<BenefitType, string> = benefitTypeLabelMap;

  get topClass(): string {
    switch (this.benefit.type) {
      case BenefitType.DISCOUNT:
        return 'top-discount';
      case BenefitType.CASHBACK:
        return 'top-cashback';
      case BenefitType.OPPORTUNITY:
        return 'top-opportunity';
      case BenefitType.INFO:
      default:
        return 'top-info';
    }
  }

  get illustrationPath(): string {
    return `assets/illustrations/${this.benefit.type}.svg`;
  }

  get categoryLabel(): string {
    return getCategoryLabel(this.benefit.category);
  }

  get activeRangeLabel(): string {
    return `${this.formatDate(this.benefit.activeFrom)} - ${this.formatDate(this.benefit.activeTo)}`;
  }

  get displayDays(): string {
    if (this.benefit.appliesEveryDay) {
      return 'Todos los días';
    }

    return this.benefit.validDays.map((day) => dayMap[day] ?? day).join(', ');
  }

  get appliesToday(): boolean {
    return this.isActiveToday() && this.appliesForWeekday(getCurrentWeekDay());
  }

  private appliesForWeekday(day: WeekDay): boolean {
    return this.benefit.appliesEveryDay || this.benefit.validDays.includes(day);
  }

  private isActiveToday(): boolean {
    const start = this.parseDateOnly(this.benefit.activeFrom);
    const end = this.parseDateOnly(this.benefit.activeTo);

    if (!start || !end) {
      return true;
    }

    const today = this.parseDateOnly(new Date().toISOString().slice(0, 10));
    if (!today) {
      return true;
    }

    return today >= start && today <= end;
  }

  private parseDateOnly(rawDate: string): Date | null {
    const date = new Date(`${rawDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private formatDate(dateText: string): string {
    const date = new Date(`${dateText}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return dateText;
    }

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}
