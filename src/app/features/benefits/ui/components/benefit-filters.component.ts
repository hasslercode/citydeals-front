import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BenefitFilters } from '../../domain/interfaces/benefit-repository.interface';
import { getCategoryLabel, getCategoryIcon } from '../utils/benefit-labels';
import { NavItem } from './benefits-sidebar.component';

interface KindChip { id: string; label: string; }

@Component({
  selector: 'app-benefits-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="filter-panel">

      <!-- Panel header -->
      <div class="panel-header">
        <span class="panel-title">Filtros</span>
        <button type="button" class="clear-btn" (click)="clearAll()">Limpiar</button>
      </div>

      <!-- ── BANKS VIEW FILTER ── -->
      <ng-container *ngIf="activeNav === 'banks'">

        <!-- Kind chips: Todos / Bancos / Franquicias / Tiendas / Programas -->
        <section class="filter-section">
          <h4 class="section-title">Tipo</h4>
          <div class="chip-row">
            <button *ngFor="let k of kindChips" type="button" class="chip"
              [class.chip-active]="activeKind === k.id" (click)="activeKind = k.id">
              {{ k.label }}
            </button>
          </div>
        </section>

        <!-- Bank source checkboxes -->
        <section class="filter-section" *ngIf="bankSources.length">
          <h4 class="section-title">Banco / Franquicia</h4>
          <ul class="check-list">
            <li *ngFor="let src of bankSources" class="check-item" (click)="toggleSource(src)">
              <span class="check-box" [class.checked]="selectedSources.has(src)">
                <span *ngIf="selectedSources.has(src)" class="check-mark">✓</span>
              </span>
              <span class="check-label">{{ src }}</span>
            </li>
          </ul>
        </section>

        <!-- Category pills -->
        <section class="filter-section" *ngIf="categories.length">
          <h4 class="section-title">Categoría</h4>
          <div class="chip-row chip-wrap">
            <button *ngFor="let cat of categories" type="button" class="chip chip-sm"
              [class.chip-active]="selectedCategory === cat" (click)="toggleCategory(cat)">
              {{ getCategoryIcon(cat) }} {{ getCategoryLabel(cat) }}
            </button>
          </div>
        </section>

      </ng-container>

      <!-- ── DEFAULT (TODAY / DAYS) FILTER ── -->
      <ng-container *ngIf="activeNav !== 'banks'">

        <!-- Quick chips -->
        <div class="chip-row">
          <button type="button" class="chip" [class.chip-active]="activeChips.has('today')"
            (click)="toggleChip('today')">🔥 Hoy</button>
          <button type="button" class="chip" [class.chip-active]="activeChips.has('transport')"
            (click)="toggleChip('transport')">🚗 Transporte</button>
          <button type="button" class="chip" [class.chip-active]="activeChips.has('restaurant')"
            (click)="toggleChip('restaurant')">🍽️ Restaurantes</button>
        </div>

        <!-- Sources -->
        <section class="filter-section" *ngIf="sources.length">
          <h4 class="section-title">Fuente</h4>
          <div class="chip-row chip-wrap">
            <button *ngFor="let src of sources" type="button" class="chip chip-sm"
              [class.chip-active]="selectedSources.has(src)" (click)="toggleSource(src)">
              {{ src }}
            </button>
          </div>
        </section>

        <!-- Card types -->
        <section class="filter-section" *ngIf="cardTypes.length">
          <h4 class="section-title">Tarjeta</h4>
          <ul class="check-list">
            <li *ngFor="let ct of cardTypes" class="check-item" (click)="toggleCardType(ct)">
              <span class="check-box" [class.checked]="selectedCardTypes.has(ct)">
                <span *ngIf="selectedCardTypes.has(ct)" class="check-mark">✓</span>
              </span>
              <span class="check-label">{{ ct | titlecase }}</span>
            </li>
          </ul>
        </section>

        <!-- Categories -->
        <section class="filter-section" *ngIf="categories.length">
          <h4 class="section-title">Categoría</h4>
          <ul class="category-list">
            <li *ngFor="let cat of categories" class="cat-item"
              [class.cat-active]="selectedCategory === cat" (click)="toggleCategory(cat)">
              <span class="cat-icon">{{ getCategoryIcon(cat) }}</span>
              <span>{{ getCategoryLabel(cat) }}</span>
            </li>
          </ul>
        </section>

      </ng-container>

      <!-- Apply button -->
      <button type="button" class="apply-btn" (click)="apply()">Aplicar filtros</button>

    </aside>
  `,
  styles: [`
    .filter-panel {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 1.25rem 1rem;
      height: 100%;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .panel-title {
      font-size: 1rem;
      font-weight: 700;
      color: #111827;
    }

    .clear-btn {
      background: none;
      border: none;
      font-size: 0.78rem;
      color: #6366f1;
      cursor: pointer;
      font-weight: 500;
      padding: 0;
    }

    .clear-btn:hover { text-decoration: underline; }

    /* ── CHIP ROW ── */
    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .chip-wrap { max-height: 7rem; overflow-y: auto; }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      border: 1.5px solid #e5e7eb;
      border-radius: 999px;
      background: #fff;
      color: #374151;
      font-size: 0.78rem;
      font-weight: 500;
      padding: 0.3rem 0.7rem;
      cursor: pointer;
      transition: all 0.13s;
      white-space: nowrap;
    }

    .chip-sm { font-size: 0.72rem; padding: 0.25rem 0.55rem; }
    .chip:hover { border-color: #6366f1; color: #4f46e5; }
    .chip-active { background: #4f46e5; border-color: #4f46e5; color: #fff; }

    /* ── FILTER SECTION ── */
    .filter-section { display: flex; flex-direction: column; gap: 0.55rem; }

    .section-title {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* ── CHECKBOX STYLE ── */
    .check-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.05rem; }

    .check-item {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.4rem 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.12s;
    }

    .check-item:hover { background: #f3f4f6; }

    .check-box {
      width: 1.1rem;
      height: 1.1rem;
      min-width: 1.1rem;
      border-radius: 0.25rem;
      border: 1.5px solid #d1d5db;
      background: #fff;
      display: grid;
      place-items: center;
      transition: all 0.12s;
    }

    .check-box.checked { background: #4f46e5; border-color: #4f46e5; }
    .check-mark { font-size: 0.65rem; color: #fff; font-weight: 800; }

    .check-label { font-size: 0.84rem; color: #374151; }

    /* ── CATEGORY LIST ── */
    .category-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.05rem; }

    .cat-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.45rem 0.6rem;
      border-radius: 0.5rem;
      font-size: 0.84rem;
      color: #374151;
      cursor: pointer;
      transition: background 0.12s;
    }

    .cat-item:hover { background: #f3f4f6; }
    .cat-item.cat-active { background: #ede9fe; color: #4f46e5; font-weight: 600; }
    .cat-icon { font-size: 1rem; width: 1.2rem; text-align: center; }

    /* ── APPLY BUTTON ── */
    .apply-btn {
      margin-top: auto;
      width: 100%;
      padding: 0.75rem;
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 0.75rem;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: filter 0.15s;
    }

    .apply-btn:hover { filter: brightness(1.08); }
  `]
})
export class BenefitsFilterPanelComponent {
  @Input() sources: string[] = [];
  @Input() categories: string[] = [];
  @Input() cardTypes: string[] = [];
  @Input() activeNav: NavItem = 'today';
  @Output() filter = new EventEmitter<BenefitFilters>();

  readonly getCategoryLabel = getCategoryLabel;
  readonly getCategoryIcon = getCategoryIcon;

  activeChips = new Set<string>();
  selectedSources = new Set<string>();
  selectedCardTypes = new Set<string>();
  selectedCategory = '';
  activeKind = '';

  readonly kindChips: KindChip[] = [
    { id: '',        label: 'Todos' },
    { id: 'bank',    label: 'Bancos' },
    { id: 'card',    label: 'Franquicias' },
    { id: 'store',   label: 'Tiendas' },
    { id: 'program', label: 'Programas' },
  ];

  // Bank / franchise sources that appear in the banks nav
  readonly bankSources = [
    'Bancolombia', 'Banco Falabella', 'Davivienda', 'BBVA',
    'Nu Bank', 'Banco de Occidente', 'AV Villas', 'Scotiabank Colpatria',
    'Mastercard', 'Mastercard Priceless', 'American Express',
  ];

  toggleChip(id: string): void {
    this.activeChips.has(id) ? this.activeChips.delete(id) : this.activeChips.add(id);
  }

  toggleSource(src: string): void {
    this.selectedSources.has(src) ? this.selectedSources.delete(src) : this.selectedSources.add(src);
  }

  toggleCardType(ct: string): void {
    this.selectedCardTypes.has(ct) ? this.selectedCardTypes.delete(ct) : this.selectedCardTypes.add(ct);
  }

  toggleCategory(cat: string): void {
    this.selectedCategory = this.selectedCategory === cat ? '' : cat;
  }

  apply(): void {
    if (this.activeNav === 'banks') {
      this.filter.emit({
        sources: this.selectedSources.size ? [...this.selectedSources] : undefined,
        category: this.selectedCategory || undefined,
      });
    } else {
      const onlyToday = this.activeChips.has('today');
      const transportCat = this.activeChips.has('transport') ? 'transport' : undefined;
      const restaurantCat = this.activeChips.has('restaurant') ? 'restaurant' : undefined;
      this.filter.emit({
        sources: this.selectedSources.size ? [...this.selectedSources] : undefined,
        category: this.selectedCategory || transportCat || restaurantCat || undefined,
        cardType: this.selectedCardTypes.size ? [...this.selectedCardTypes][0] : undefined,
        onlyToday: onlyToday || undefined,
      });
    }
  }

  clearAll(): void {
    this.activeChips.clear();
    this.selectedSources.clear();
    this.selectedCardTypes.clear();
    this.selectedCategory = '';
    this.activeKind = '';
    this.filter.emit({});
  }
}

export { BenefitsFilterPanelComponent as BenefitFiltersComponent };
