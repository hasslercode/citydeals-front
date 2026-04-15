import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Benefit } from '../../domain/models/benefit.model';
import { BenefitType } from '../../domain/enums/benefit-type.enum';
import {
  benefitTypeLabelMap,
  benefitTypeStyleMap,
  extractHighlight,
  getSourceColor,
  getSourceInitials,
} from '../utils/benefit-labels';

const FEATURED_GRADIENTS = [
  'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
  'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
];

@Component({
  selector: 'app-benefit-featured-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="featured-card" [style.background]="gradient">
      <div class="feat-top">
        <span class="feat-badge">{{ typeLabel }}</span>
        <div class="feat-source-avatar" [style.background]="sourceAvatarBg">
          {{ sourceInitials }}
        </div>
      </div>

      <div class="feat-body">
        <div class="feat-highlight" *ngIf="highlight">{{ highlight }}</div>
        <p class="feat-desc">{{ bodyText }}</p>
      </div>

      <footer class="feat-footer">
        <a [href]="benefit.termsUrl" target="_blank" rel="noopener noreferrer" class="feat-link">
          Ver más
        </a>
        <a [href]="benefit.termsUrl" target="_blank" rel="noopener noreferrer" class="feat-btn">
          Ver más
        </a>
      </footer>
    </article>
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .featured-card {
      border-radius: 1.1rem;
      padding: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      height: 100%;
      min-height: 180px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
      overflow: hidden;
      position: relative;
    }

    .feat-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .feat-badge {
      background: rgba(255,255,255,0.22);
      color: #fff;
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.35);
    }

    .feat-source-avatar {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.4);
      display: grid;
      place-items: center;
      font-size: 0.7rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 0.02em;
    }

    .feat-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .feat-highlight {
      font-size: 2rem;
      font-weight: 900;
      color: #fff;
      line-height: 1;
      text-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .feat-desc {
      margin: 0;
      font-size: 0.82rem;
      color: rgba(255,255,255,0.9);
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .feat-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: auto;
    }

    .feat-link {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.85);
      text-decoration: none;
      font-weight: 500;
    }

    .feat-link:hover { color: #fff; text-decoration: underline; }

    .feat-btn {
      margin-left: auto;
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.4);
      color: #fff;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      text-decoration: none;
      transition: background 0.15s;
    }

    .feat-btn:hover { background: rgba(255,255,255,0.3); }
  `]
})
export class BenefitFeaturedCardComponent {
  @Input({ required: true }) benefit!: Benefit;
  @Input() index: number = 0;

  get gradient(): string {
    return FEATURED_GRADIENTS[this.index % FEATURED_GRADIENTS.length];
  }

  get typeLabel(): string {
    return benefitTypeLabelMap[this.benefit.type] ?? this.benefit.type;
  }

  get sourceInitials(): string {
    return getSourceInitials(this.benefit.source);
  }

  get sourceAvatarBg(): string {
    return getSourceColor(this.benefit.source);
  }

  get highlight(): string {
    return extractHighlight(this.benefit.title);
  }

  get bodyText(): string {
    const hl = this.highlight;
    if (!hl) return this.benefit.title;
    const idx = this.benefit.title.indexOf(hl);
    return idx !== -1
      ? this.benefit.title.slice(idx + hl.length).trim()
      : this.benefit.title;
  }
}
