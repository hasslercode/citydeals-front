import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { BenefitsFacade, SourceGroup } from '../../application/services/benefits.facade';
import { BenefitFilters } from '../../domain/interfaces/benefit-repository.interface';
import { getCurrentWeekDay } from '../../../../shared/utils/day.utils';
import { getCategoryLabel, getCategoryIcon, extractHighlight } from '../utils/benefit-labels';
import { Benefit } from '../../domain/models/benefit.model';
import { BenefitsSidebarComponent, NavItem } from '../components/benefits-sidebar.component';
import { BenefitSourceCardComponent } from '../components/benefit-source-card.component';
import { BenefitSourceDrawerComponent } from '../components/benefit-source-drawer.component';
import { BenefitStoreCardComponent } from '../components/benefit-store-card.component';
import { BenefitDayHeroCardComponent } from '../components/benefit-day-hero-card.component';
import { BenefitDayCompactCardComponent } from '../components/benefit-day-compact-card.component';
import { BenefitDetailDrawerComponent } from '../components/benefit-detail-drawer.component';
import { BenefitTodayMidCardComponent } from '../components/benefit-today-mid-card.component';

const DAY_LABEL: Record<string, string> = {
  monday: 'lunes', tuesday: 'martes', wednesday: 'miércoles',
  thursday: 'jueves', friday: 'viernes', saturday: 'sábado', sunday: 'domingo',
};

// Map source name → kind (bank | card | store | program)
const SOURCE_KIND: Record<string, string> = {
  'Bancolombia':             'bank',
  'Nu Bank':                 'bank',
  'Banco Falabella':         'bank',
  'BBVA':                    'bank',
  'Davivienda':              'bank',
  'Banco de Occidente':      'bank',
  'AV Villas':               'bank',
  'Scotiabank Colpatria':    'bank',
  'Mastercard':              'card',
  'Mastercard Priceless':    'card',
  'American Express':        'card',
  'Olímpica':                'store',
  'Tarjeta Olímpica':        'store',
  'Terpel':                  'store',
  'Convenio Policía Nacional':'program',
  'Convenio Policía':        'program',
  'Prosegur Alarms':          'store',
};

type KindTab = '' | 'bank' | 'card';

@Component({
  selector: 'app-benefits-home-page',
  standalone: true,
  imports: [
    CommonModule,
    BenefitsSidebarComponent,
    BenefitSourceCardComponent,
    BenefitSourceDrawerComponent,
    BenefitStoreCardComponent,
    BenefitDayHeroCardComponent,
    BenefitDayCompactCardComponent,
    BenefitDetailDrawerComponent,
    BenefitTodayMidCardComponent,
  ],
  template: `
    <!-- ─── Root layout ───────────────────────────────────── -->
    <div class="root" [class.drawer-open]="!!selectedGroup">

      <!-- LEFT SIDEBAR -->
      <aside class="sidebar-col">
        <app-benefits-sidebar [activeNav]="activeNav" (navChange)="onNavChange($event)" />
      </aside>

      <!-- MAIN -->
      <main class="main-col" [class.with-filters]="activeNav !== 'banks'">

        <!-- ═══════════════════════════════════════════════
             HOY VIEW
        ═══════════════════════════════════════════════ -->
        <ng-container *ngIf="activeNav === 'today'">

          <ng-container *ngIf="(facade.todayBenefits$ | async) as todayAll">

            <!-- Dynamic header -->
            <div class="page-header">
              <h1 class="page-title">Hoy</h1>
              <ng-container *ngIf="todayMaxSaving(todayAll) as saving; else defaultSub">
                <p class="page-sub">
                  Ahorra hasta <strong class="saving-hl">{{ saving }}</strong> hoy
                </p>
              </ng-container>
              <ng-template #defaultSub>
                <p class="page-sub">Beneficios activos para hoy, {{ todayLabel }}</p>
              </ng-template>
            </div>

            <!-- 🔥 / 🎯 Hero carousel -->
            <div class="today-section" *ngIf="todayHeroBenefits(todayAll).length">
              <div class="today-section-hd">
                <span class="today-section-ico">{{ hasDaySpecificBenefits(todayAll) ? '🎯' : '🔥' }}</span>
                <span class="today-section-txt">{{ hasDaySpecificBenefits(todayAll) ? 'Exclusivos de hoy' : 'Mejores descuentos' }}</span>
              </div>
              <div class="hero-carousel">
                <app-benefit-day-hero-card
                  *ngFor="let b of todayHeroBenefits(todayAll)"
                  [benefit]="b"
                  (select)="openBenefitDrawer($event)"
                />
              </div>
            </div>

            <!-- Category chips -->
            <div class="today-chips" *ngIf="todayCategories(todayAll).length > 0">
              <button class="tchip"
                [class.tchip-on]="!todayActiveCategory"
                (click)="setTodayCategory('')" type="button">Todos</button>
              <button class="tchip"
                *ngFor="let cat of todayCategories(todayAll)"
                [class.tchip-on]="todayActiveCategory === cat"
                (click)="setTodayCategory(cat)" type="button">
                {{ getCategoryIcon(cat) }} {{ getCategoryLabel(cat) }}
              </button>
            </div>

            <!-- 💡 Disponibles hoy -->
            <div class="today-section" *ngIf="todayRecommended(todayAll).length">
              <div class="today-section-hd">
                <span class="today-section-ico">💡</span>
                <span class="today-section-txt">Disponibles hoy</span>
              </div>
              <div class="mid-grid">
                <app-benefit-today-mid-card
                  *ngFor="let b of todayRecommended(todayAll)"
                  [benefit]="b"
                  (select)="openBenefitDrawer($event)"
                />
              </div>
            </div>

            <!-- 📦 Más opciones -->
            <div class="today-section" *ngIf="todayMore(todayAll).length">
              <div class="today-section-hd">
                <span class="today-section-ico">📦</span>
                <span class="today-section-txt">Más opciones</span>
              </div>
              <div class="compact-grid">
                <app-benefit-day-compact-card
                  *ngFor="let b of todayMore(todayAll)"
                  [benefit]="b"
                  (select)="openBenefitDrawer($event)"
                />
              </div>
            </div>

            <!-- Empty state -->
            <div class="empty-state"
              *ngIf="!todayActionable(todayAll).length">
              No hay beneficios disponibles para hoy
            </div>

          </ng-container>

        </ng-container>

        <!-- ═══════════════════════════════════════════════
             TARJETAS VIEW
        ═══════════════════════════════════════════════ -->
        <ng-container *ngIf="activeNav === 'banks'">

          <div class="page-header">
            <h1 class="page-title">Tarjetas</h1>
            <p class="page-sub">Explora beneficios de tus bancos y franquicias</p>
          </div>

          <!-- Inline filter bar -->
          <div class="filter-bar">
            <div class="kind-tabs">
              <button class="ktab" [class.ktab-on]="activeKind === ''"
                (click)="setKind('')" type="button">Todos</button>
              <button class="ktab" [class.ktab-on]="activeKind === 'bank'"
                (click)="setKind('bank')" type="button">Bancos</button>
              <button class="ktab" [class.ktab-on]="activeKind === 'card'"
                (click)="setKind('card')" type="button">Franquicias</button>
            </div>
            <button class="clear-link" *ngIf="activeKind !== ''" (click)="setKind('')"
              type="button">Limpiar filtros</button>
          </div>

          <!-- Cards grid -->
          <ng-container *ngIf="(facade.benefitsBySource$ | async) as groups; else skelGrid">
            <div class="cards-grid" *ngIf="filteredGroups(groups).length; else emptyState">
              <app-benefit-source-card
                *ngFor="let g of filteredGroups(groups)"
                [group]="g"
                (select)="openDrawer($event)"
              />
            </div>
            <ng-template #emptyState>
              <div class="empty-state">
                <span>Sin resultados para este filtro</span>
              </div>
            </ng-template>
          </ng-container>

          <ng-template #skelGrid>
            <div class="cards-grid">
              <div class="skel-source" *ngFor="let _ of [1,2,3,4,5,6]"></div>
            </div>
          </ng-template>

        </ng-container>

        <!-- ═══════════════════════════════════════════════
             TIENDAS VIEW
        ═══════════════════════════════════════════════ -->
        <ng-container *ngIf="activeNav === 'stores'">

          <div class="page-header">
            <h1 class="page-title">Tiendas</h1>
            <p class="page-sub">Explora beneficios en tus comercios aliados</p>
          </div>

          <ng-container *ngIf="(facade.benefitsBySource$ | async) as groups">

            <!-- Category chips -->
            <div class="store-filter-bar">
              <button class="sfchip" [class.sfchip-on]="!storeActiveCategory"
                (click)="setStoreCategory('')" type="button">Todos</button>
              <button class="sfchip"
                *ngFor="let cat of storeCategories(groups)"
                [class.sfchip-on]="storeActiveCategory === cat"
                (click)="setStoreCategory(cat)" type="button">
                {{ getCategoryIcon(cat) }} {{ getCategoryLabel(cat) }}
              </button>
            </div>

            <!-- Store cards -->
            <div class="stores-grid" *ngIf="filteredStoreGroups(groups).length; else noStores">
              <app-benefit-store-card
                *ngFor="let g of filteredStoreGroups(groups)"
                [group]="g"
                (select)="openDrawer($event)"
              />
            </div>
            <ng-template #noStores>
              <div class="empty-state">Sin tiendas para este filtro</div>
            </ng-template>

          </ng-container>

        </ng-container>

        <!-- ═══════════════════════════════════════════════
             DÍAS VIEW
        ═══════════════════════════════════════════════ -->
        <ng-container *ngIf="activeNav === 'days'">

          <div class="page-header">
            <h1 class="page-title">Días</h1>
            <p class="page-sub">Optimiza tus beneficios según el día</p>
          </div>

          <!-- ── Segmented day control ── -->
          <div class="day-seg-wrap">
            <div class="day-seg">
              <button
                *ngFor="let d of weekDays"
                class="dseg"
                [class.dseg-on]="activeDay === d.id"
                [class.dseg-today]="d.id === todayId && activeDay !== d.id"
                (click)="setDay(d.id)"
                type="button"
              >
                <span class="dseg-lbl">{{ d.label | slice:0:3 }}</span>
                <span class="dseg-dot" *ngIf="d.id === todayId"></span>
              </button>
            </div>
          </div>

          <ng-container *ngIf="(facade.filteredBenefits$ | async) as allBenefits">

            <!-- Category chips -->
            <div class="day-chips" *ngIf="dayCategories(allBenefits).length > 1">
              <button class="dchip" [class.dchip-on]="!dayActiveCategory"
                (click)="setDayCategory('')" type="button">Todos</button>
              <button class="dchip"
                *ngFor="let cat of dayCategories(allBenefits)"
                [class.dchip-on]="dayActiveCategory === cat"
                (click)="setDayCategory(cat)"
                type="button">
                {{ getCategoryIcon(cat) }} {{ getCategoryLabel(cat) }}
              </button>
            </div>

            <ng-container *ngIf="filteredDayBenefits(allBenefits) as dayBenefits">

              <!-- 🔥 Hero benefits -->
              <div class="day-section" *ngIf="heroBenefits(dayBenefits).length">
                <div class="day-section-hd">
                  <span class="day-section-ico">🔥</span>
                  <span class="day-section-txt">Destacados del día</span>
                </div>
                <div class="hero-grid">
                  <app-benefit-day-hero-card
                    *ngFor="let b of heroBenefits(dayBenefits)"
                    [benefit]="b"
                    (select)="openBenefitDrawer($event)"
                  />
                </div>
              </div>

              <!-- ⚡ Other benefits -->
              <div class="day-section" *ngIf="otherBenefits(dayBenefits).length">
                <div class="day-section-hd">
                  <span class="day-section-ico">⚡</span>
                  <span class="day-section-txt">También disponibles</span>
                </div>
                <div class="compact-grid">
                  <app-benefit-day-compact-card
                    *ngFor="let b of otherBenefits(dayBenefits)"
                    [benefit]="b"
                    (select)="openBenefitDrawer($event)"
                  />
                </div>
              </div>

              <!-- Empty state -->
              <div class="empty-state"
                *ngIf="!heroBenefits(dayBenefits).length && !otherBenefits(dayBenefits).length">
                Sin beneficios para este día
              </div>

            </ng-container>
          </ng-container>

        </ng-container>

      </main>

      <!-- filter-col removed; layout is always sidebar + main 2-col -->

    </div>

    <!-- MOBILE BOTTOM NAV -->
    <nav class="mob-nav" aria-label="Navegación">
      <button class="mob-item" [class.mob-on]="activeNav === 'today'" (click)="onNavChange('today')" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        <span>Hoy</span>
      </button>
      <button class="mob-item" [class.mob-on]="activeNav === 'banks'" (click)="onNavChange('banks')" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
        <span>Tarjetas</span>
      </button>
      <button class="mob-item" [class.mob-on]="activeNav === 'stores'" (click)="onNavChange('stores')" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>Tiendas</span>
      </button>
      <button class="mob-item" [class.mob-on]="activeNav === 'days'" (click)="onNavChange('days')" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>Días</span>
      </button>
    </nav>

    <!-- SOURCE DRAWER (banks / stores) -->
    <app-benefit-source-drawer
      [group]="selectedGroup"
      [isOpen]="!!selectedGroup"
      (closed)="closeDrawer()"
    />

    <!-- BENEFIT DETAIL DRAWER (days) -->
    <app-benefit-detail-drawer
      [benefit]="selectedBenefit"
      [isOpen]="!!selectedBenefit"
      (closed)="closeBenefitDrawer()"
    />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #f4f6fb; }

    /* ── ROOT GRID: always sidebar + main ── */
    .root {
      display: grid;
      grid-template-columns: 220px 1fr;
      min-height: 100vh;
      max-width: 1440px;
      margin: 0 auto;
    }

    /* SIDEBAR */
    .sidebar-col {
      background: #fff;
      border-right: 1px solid #f0f2f7;
      position: sticky; top: 0; height: 100vh;
      overflow-y: auto;
    }

    /* MAIN */
    .main-col {
      padding: 2rem 2.25rem 3rem;
      display: flex; flex-direction: column; gap: 1.75rem;
      min-width: 0; overflow-x: hidden;
    }

    /* RIGHT FILTER */
    .filter-col {
      background: #fff;
      border-left: 1px solid #f0f2f7;
      position: sticky; top: 0; height: 100vh;
      overflow-y: auto;
    }

    /* ── PAGE HEADER ── */
    .page-header { display: flex; flex-direction: column; gap: 0.2rem; }

    .page-title {
      margin: 0; font-size: 1.75rem; font-weight: 800;
      color: #0f172a; letter-spacing: -0.02em;
    }

    .page-sub {
      margin: 0; font-size: 0.9rem; color: #64748b;
    }

    /* ── SECTION ── */
    .section { display: flex; flex-direction: column; gap: 1rem; }

    .section-label {
      margin: 0; font-size: 1rem; font-weight: 700; color: #1e293b;
    }

    /* ── FEATURED ── */
    .featured-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem;
    }

    .skel-card {
      height: 180px; border-radius: 14px;
      background: linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
    }

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── INLINE CHIPS ── */
    .inline-chips {
      display: flex; flex-wrap: wrap; gap: 0.4rem;
      padding-bottom: 0.5rem; border-bottom: 1px solid #e9ecf0;
    }

    .chip {
      border: 1.5px solid #e5e7eb; border-radius: 999px;
      background: #fff; color: #374151;
      font-size: 0.8rem; font-weight: 500;
      padding: 0.3rem 0.8rem; cursor: pointer;
      transition: all 0.13s;
    }

    .chip:hover { border-color: #6366f1; color: #4f46e5; }
    .chip.chip-on { background: #4f46e5; border-color: #4f46e5; color: #fff; }

    /* ── FILTER BAR (banks) ── */
    .filter-bar {
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; flex-wrap: wrap;
    }

    .kind-tabs { display: flex; gap: 0.35rem; }

    .ktab {
      border: 1.5px solid #e5e7eb; border-radius: 999px;
      background: #fff; color: #374151;
      font-size: 0.85rem; font-weight: 600;
      padding: 0.4rem 1rem; cursor: pointer;
      transition: all 0.13s;
    }

    .ktab:hover { border-color: #6366f1; color: #4f46e5; }
    .ktab.ktab-on { background: #4f46e5; border-color: #4f46e5; color: #fff; }

    .clear-link {
      border: none; background: none;
      font-size: 0.82rem; font-weight: 500; color: #9ca3af;
      cursor: pointer; padding: 0;
      transition: color 0.12s;
    }

    .clear-link:hover { color: #374151; }

    /* ── CARDS GRID ── */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.1rem;
      align-items: start;
    }

    .cards-grid.narrow {
      grid-template-columns: repeat(2, 1fr);
      max-width: 620px;
    }

    .skel-source {
      height: 320px; border-radius: 16px;
      background: linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
    }

    .empty-state {
      padding: 3rem; text-align: center;
      color: #9ca3af; font-size: 0.9rem;
    }

    /* ── TODAY VIEW ── */
    .saving-hl {
      color: #16a34a;
      font-weight: 900;
    }

    /* Hero carousel: horizontal scroll with snap */
    .hero-carousel {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 0.75rem;
      scrollbar-width: none;
      margin: 0 -2.25rem;
      padding-left: 2.25rem;
      padding-right: 2.25rem;
    }
    .hero-carousel::-webkit-scrollbar { display: none; }
    .hero-carousel > * {
      flex: 0 0 260px;
      min-height: 210px;
      scroll-snap-align: start;
    }

    /* Today category chips */
    .today-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .tchip {
      border: 1.5px solid #e5e7eb;
      border-radius: 999px;
      background: #fff;
      color: #374151;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.32rem 0.85rem;
      cursor: pointer;
      transition: all 0.13s;
    }
    .tchip:hover { border-color: #6366f1; color: #4f46e5; }
    .tchip.tchip-on { background: #4f46e5; border-color: #4f46e5; color: #fff; }

    /* Today section header (shared with days) */
    .today-section { display: flex; flex-direction: column; gap: 0.85rem; }
    .today-section-hd { display: flex; align-items: center; gap: 0.45rem; }
    .today-section-ico { font-size: 1.1rem; }
    .today-section-txt { font-size: 1.05rem; font-weight: 800; color: #111827; }

    /* Mid cards grid (2-3 col auto-fill) */
    .mid-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 0.9rem;
      align-items: start;
    }
    .day-seg-wrap {
      background: #fff;
      border-radius: 16px;
      padding: 0.45rem;
      box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
    }

    .day-seg {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.2rem;
    }

    .dseg {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.28rem;
      padding: 0.6rem 0.2rem 0.5rem;
      border: none;
      background: transparent;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .dseg:hover:not(.dseg-on) { background: #f5f7ff; }

    .dseg-lbl {
      font-size: 0.82rem;
      font-weight: 600;
      color: #6b7280;
      transition: color 0.15s;
    }

    .dseg-dot {
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #4f46e5;
    }

    .dseg.dseg-today .dseg-lbl { color: #4f46e5; }
    .dseg.dseg-on { background: #4f46e5; }
    .dseg.dseg-on .dseg-lbl { color: #fff; font-weight: 700; }
    .dseg.dseg-on .dseg-dot { background: rgba(255,255,255,0.65); }

    /* Day category chips */
    .day-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .dchip {
      border: 1.5px solid #e5e7eb;
      border-radius: 999px;
      background: #fff;
      color: #374151;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.32rem 0.85rem;
      cursor: pointer;
      transition: all 0.13s;
    }
    .dchip:hover { border-color: #6366f1; color: #4f46e5; }
    .dchip.dchip-on { background: #4f46e5; border-color: #4f46e5; color: #fff; }

    /* Section headers */
    .day-section { display: flex; flex-direction: column; gap: 0.85rem; }
    .day-section-hd { display: flex; align-items: center; gap: 0.45rem; }
    .day-section-ico { font-size: 1.1rem; }
    .day-section-txt { font-size: 1.05rem; font-weight: 800; color: #111827; }

    /* Hero grid */
    .hero-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      align-items: stretch;
    }

    /* Compact grid */
    .compact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 0.65rem;
    }

    /* ── STORES SECTION ── */
    .store-filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      padding-bottom: 0.25rem;
    }

    .sfchip {
      border: 1.5px solid #e5e7eb;
      border-radius: 999px;
      background: #fff;
      color: #374151;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.32rem 0.85rem;
      cursor: pointer;
      transition: all 0.13s;
    }

    .sfchip:hover { border-color: #6366f1; color: #4f46e5; }
    .sfchip.sfchip-on { background: #4f46e5; border-color: #4f46e5; color: #fff; }

    .stores-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.1rem;
      align-items: start;
    }

    /* ── MOBILE BOTTOM NAV ── */
    .mob-nav {
      display: none; /* hidden on desktop */
    }

    /* ── RESPONSIVE 1200px ── */
    @media (max-width: 1200px) {
      .root { grid-template-columns: 200px 1fr; }
      .cards-grid { grid-template-columns: repeat(2, 1fr); }
      .featured-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* ── RESPONSIVE 900px ── */
    @media (max-width: 900px) {
      .root { grid-template-columns: 180px 1fr; }
      .cards-grid { grid-template-columns: repeat(2, 1fr); }
      .stores-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* ── RESPONSIVE 720px (mobile) ── */
    @media (max-width: 720px) {
      :host { padding-bottom: 72px; }
      .root { grid-template-columns: 1fr !important; }
      .sidebar-col { display: none; }

      .main-col {
        padding: 1.25rem 1rem 1.5rem;
        gap: 1.25rem;
      }

      /* Page headers */
      .page-title { font-size: 1.4rem; }
      .page-sub { font-size: 0.84rem; }

      /* Chip bars — horizontal scroll on small screens */
      .today-chips, .day-chips, .store-filter-bar {
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 0.2rem;
        -webkit-overflow-scrolling: touch;
      }
      .today-chips::-webkit-scrollbar,
      .day-chips::-webkit-scrollbar,
      .store-filter-bar::-webkit-scrollbar { display: none; }

      /* Cards grids */
      .cards-grid { grid-template-columns: 1fr; }
      .cards-grid.narrow { grid-template-columns: 1fr; max-width: 100%; }
      .featured-grid { grid-template-columns: 1fr; }
      .stores-grid { grid-template-columns: 1fr; }
      .mid-grid { grid-template-columns: repeat(2, 1fr); }
      .hero-grid { grid-template-columns: repeat(2, 1fr); }
      .compact-grid { grid-template-columns: 1fr; }

      /* Hero carousel — narrower cards */
      .hero-carousel {
        margin: 0 -1rem;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .hero-carousel > * { flex: 0 0 240px; }

      /* Day segmented control — allow scroll if needed */
      .day-seg-wrap { overflow-x: auto; scrollbar-width: none; }
      .day-seg-wrap::-webkit-scrollbar { display: none; }
      .day-seg { min-width: 420px; }
      .dseg { padding: 0.5rem 0.15rem; }
      .dseg-lbl { font-size: 0.72rem; }

      /* Section headers */
      .today-section-txt, .day-section-txt { font-size: 0.95rem; }

      /* Kind tabs — scrollable */
      .kind-tabs { overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap; }
      .kind-tabs::-webkit-scrollbar { display: none; }

      /* Mobile bottom nav */
      .mob-nav {
        display: flex;
        position: fixed;
        bottom: 0; left: 0; right: 0;
        height: 64px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-top: 1px solid #e9ecf0;
        z-index: 100;
        align-items: stretch;
        padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
      }

      .mob-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.22rem;
        border: none;
        background: transparent;
        color: #9ca3af;
        font-size: 0.65rem;
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        transition: color 0.12s;
        min-height: 44px;
      }

      .mob-item svg { transition: stroke 0.12s; }
      .mob-item.mob-on { color: #4f46e5; }
      .mob-item.mob-on svg { stroke: #4f46e5; }
    }

    /* ── RESPONSIVE 480px (small phones) ── */
    @media (max-width: 480px) {
      .main-col { padding: 1rem 0.85rem 1.25rem; }
      .mid-grid { grid-template-columns: 1fr; }
      .hero-grid { grid-template-columns: 1fr; }
      .hero-carousel > * { flex: 0 0 200px; }
      .cards-grid { grid-template-columns: 1fr; }
      .filter-bar { gap: 0.6rem; }
      .ktab, .tchip, .dchip, .sfchip { font-size: 0.78rem; padding: 0.28rem 0.7rem; }
    }
  `]
})
export class BenefitsHomePage implements OnInit {
  readonly facade = inject(BenefitsFacade);
  readonly getCategoryLabel = getCategoryLabel;
  readonly getCategoryIcon = getCategoryIcon;

  activeNav: NavItem = 'today';
  activeCategory = '';
  activeKind: KindTab = '';
  activeDay = '';
  storeActiveCategory = '';
  dayActiveCategory = '';
  todayActiveCategory = '';
  selectedGroup: SourceGroup | null = null;
  selectedBenefit: Benefit | null = null;

  readonly weekDays = [
    { id: 'monday',    label: 'Lunes' },    { id: 'tuesday',   label: 'Martes' },
    { id: 'wednesday', label: 'Miércoles' },{ id: 'thursday',  label: 'Jueves' },
    { id: 'friday',    label: 'Viernes' },  { id: 'saturday',  label: 'Sábado' },
    { id: 'sunday',    label: 'Domingo' },
  ];

  get todayId(): string { return getCurrentWeekDay(); }

  get todayLabel(): string {
    return DAY_LABEL[getCurrentWeekDay()] ?? '';
  }

  ngOnInit(): void {
    this.facade.loadInitialData(getCurrentWeekDay());
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeDrawer();
    this.closeBenefitDrawer();
  }

  onNavChange(nav: NavItem): void {
    this.activeNav = nav;
    this.activeCategory = '';
    this.activeKind = '';
    this.storeActiveCategory = '';
    this.dayActiveCategory = '';
    this.todayActiveCategory = '';
    this.selectedGroup = null;
    this.selectedBenefit = null;
    if (nav === 'days') {
      this.activeDay = getCurrentWeekDay();
      this.facade.applyFilters({ day: this.activeDay as any });
    } else {
      this.activeDay = '';
      const filters: BenefitFilters = nav === 'today' ? { onlyToday: true } : {};
      this.facade.applyFilters(filters);
    }
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.facade.applyFilters({ category: cat || undefined });
  }

  setKind(kind: KindTab): void { this.activeKind = kind; }

  setDay(day: string): void {
    this.activeDay = day;
    this.dayActiveCategory = '';
    this.selectedBenefit = null;
    this.facade.applyFilters({ day: day as any });
  }

  onFilter(filters: BenefitFilters): void { this.facade.applyFilters(filters); }

  openDrawer(group: SourceGroup): void { this.selectedGroup = group; }
  closeDrawer(): void { this.selectedGroup = null; }

  filteredGroups(groups: SourceGroup[]): SourceGroup[] {
    if (!this.activeKind) return groups;
    return groups.filter((g) => SOURCE_KIND[g.source] === this.activeKind);
  }

  storeGroups(groups: SourceGroup[]): SourceGroup[] {
    return groups.filter((g) => SOURCE_KIND[g.source] === 'store');
  }

  // ── Today section ─────────────────────────────────────────────────────────

  todayActionable(benefits: Benefit[]): Benefit[] {
    return benefits.filter((b) => b.type !== 'info');
  }

  hasDaySpecificBenefits(benefits: Benefit[]): boolean {
    return benefits.some((b) => b.type !== 'info' && !b.appliesEveryDay);
  }

  setTodayCategory(cat: string): void { this.todayActiveCategory = cat; }

  todayMaxSaving(benefits: Benefit[]): string {
    const highlights = benefits
      .filter((b) => b.type !== 'info')
      .map((b) => extractHighlight(b.title))
      .filter((h) => h !== '');
    const pcts = highlights.filter((h) => h.endsWith('%'));
    if (pcts.length) return pcts.sort((a, b) => parseFloat(b) - parseFloat(a))[0];
    return highlights[0] ?? '';
  }

  todayCategories(benefits: Benefit[]): string[] {
    return [...new Set(benefits.filter((b) => b.type !== 'info').map((b) => b.category))].sort();
  }

  private _todayHeroSet(benefits: Benefit[]): Set<string> {
    return new Set(this.todayHeroBenefits(benefits).map((b) => b.id));
  }

  todayHeroBenefits(benefits: Benefit[]): Benefit[] {
    const actionable = benefits.filter((b) => b.type !== 'info');
    const filtered = this.todayActiveCategory
      ? actionable.filter((b) => b.category === this.todayActiveCategory)
      : actionable;
    // Day-specific first (truly "only today" or specific days)
    const daySpecific = filtered.filter((b) => !b.appliesEveryDay);
    if (daySpecific.length >= 1) return daySpecific.slice(0, 3);
    // Fallback: prefer benefits with a highlight value (%, $)
    const withHl = filtered.filter((b) => extractHighlight(b.title) !== '');
    return (withHl.length >= 2 ? withHl : filtered).slice(0, 3);
  }

  todayRecommended(benefits: Benefit[]): Benefit[] {
    const heroIds = this._todayHeroSet(benefits);
    const actionable = benefits.filter((b) => b.type !== 'info');
    const filtered = this.todayActiveCategory
      ? actionable.filter((b) => b.category === this.todayActiveCategory)
      : actionable;
    return filtered.filter((b) => !heroIds.has(b.id)).slice(0, 5);
  }

  todayMore(benefits: Benefit[]): Benefit[] {
    const heroIds = this._todayHeroSet(benefits);
    const actionable = benefits.filter((b) => b.type !== 'info');
    const filtered = this.todayActiveCategory
      ? actionable.filter((b) => b.category === this.todayActiveCategory)
      : actionable;
    return filtered.filter((b) => !heroIds.has(b.id)).slice(5);
  }

  setStoreCategory(cat: string): void { this.storeActiveCategory = cat; }

  storeCategories(groups: SourceGroup[]): string[] {
    const cats = new Set<string>();
    this.storeGroups(groups).forEach((g) => g.benefits.forEach((b) => cats.add(b.category)));
    return [...cats].sort();
  }

  filteredStoreGroups(groups: SourceGroup[]): SourceGroup[] {
    const stores = this.storeGroups(groups);
    if (!this.storeActiveCategory) return stores;
    return stores.filter((g) => g.benefits.some((b) => b.category === this.storeActiveCategory));
  }

  // ── Days section ─────────────────────────────────────────────────────────

  setDayCategory(cat: string): void { this.dayActiveCategory = cat; }

  dayCategories(benefits: Benefit[]): string[] {
    const actionable = benefits.filter((b) => b.type !== 'info');
    return [...new Set(actionable.map((b) => b.category))].sort();
  }

  filteredDayBenefits(benefits: Benefit[]): Benefit[] {
    const actionable = benefits.filter((b) => b.type !== 'info');
    if (!this.dayActiveCategory) return actionable;
    return actionable.filter((b) => b.category === this.dayActiveCategory);
  }

  heroBenefits(benefits: Benefit[]): Benefit[] {
    const withHl = benefits.filter((b) => extractHighlight(b.title) !== '');
    return withHl.length >= 3 ? withHl.slice(0, 4) : benefits.slice(0, 4);
  }

  otherBenefits(benefits: Benefit[]): Benefit[] {
    const heroIds = new Set(this.heroBenefits(benefits).map((b) => b.id));
    return benefits.filter((b) => !heroIds.has(b.id)).slice(0, 12);
  }

  openBenefitDrawer(benefit: Benefit): void { this.selectedBenefit = benefit; }
  closeBenefitDrawer(): void { this.selectedBenefit = null; }
}
