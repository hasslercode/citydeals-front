import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type NavItem = 'today' | 'banks' | 'stores' | 'days';

interface SidebarNav { id: NavItem; label: string; icon: string; }

// Minimal inline SVG paths (stroke icons, 24×24 viewBox)
const ICONS: Record<NavItem, string> = {
  today: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
  banks: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>`,
  stores:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  days:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
};

@Component({
  selector: 'app-benefits-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar">

      <!-- Brand -->
      <div class="brand">
        <div class="brand-badge">BH</div>
        <span class="brand-name">Benefits Hub</span>
      </div>

      <!-- Nav -->
      <nav class="nav">
        <button
          *ngFor="let item of navItems"
          type="button"
          class="nav-item"
          [class.active]="activeNav === item.id"
          (click)="navChange.emit(item.id)"
        >
          <span class="nav-icon" [innerHTML]="getIcon(item.id)"></span>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </nav>

    </aside>
  `,
  styles: [`
    .sidebar {
      display: flex; flex-direction: column; gap: 2.25rem;
      padding: 1.75rem 1rem 1rem;
      height: 100%; background: #fff;
    }

    /* BRAND */
    .brand {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0 0.4rem;
    }

    .brand-badge {
      width: 2.6rem; height: 2.6rem; min-width: 2.6rem;
      display: grid; place-items: center;
      border-radius: 12px;
      font-size: 0.82rem; font-weight: 900;
      letter-spacing: 0.03em;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%);
      box-shadow: 0 6px 18px rgba(79,70,229,0.3);
    }

    .brand-name {
      font-size: 1rem; font-weight: 700; color: #111827;
    }

    /* NAV */
    .nav {
      display: flex; flex-direction: column; gap: 0.2rem;
    }

    .nav-item {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.65rem 0.85rem;
      border: none; border-radius: 12px;
      background: transparent; cursor: pointer;
      text-align: left; color: #6b7280;
      font-size: 0.9rem; font-weight: 500;
      transition: background 0.14s, color 0.14s;
      width: 100%;
    }

    .nav-item:hover {
      background: #f3f4f6; color: #111827;
    }

    .nav-item.active {
      background: #ede9fe; color: #4f46e5; font-weight: 600;
    }

    .nav-icon {
      display: flex; align-items: center; flex-shrink: 0;
    }

    .nav-icon ::ng-deep svg { display: block; }
  `]
})
export class BenefitsSidebarComponent {
  @Input() activeNav: NavItem = 'today';
  @Output() navChange = new EventEmitter<NavItem>();

  readonly navItems: SidebarNav[] = [
    { id: 'today',  label: 'Hoy',      icon: '' },
    { id: 'banks',  label: 'Tarjetas', icon: '' },
    { id: 'stores', label: 'Tiendas',  icon: '' },
    { id: 'days',   label: 'Días',     icon: '' },
  ];

  getIcon(id: NavItem): string { return ICONS[id]; }
}
