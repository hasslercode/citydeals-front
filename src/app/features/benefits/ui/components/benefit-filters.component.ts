import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BenefitType } from '../../domain/enums/benefit-type.enum';
import { BenefitFilters } from '../../domain/interfaces/benefit-repository.interface';
import {
  benefitTypeLabelMap,
  getCategoryLabel,
} from '../utils/benefit-labels';

@Component({
    selector: 'app-benefit-filters',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <form class="filters" [formGroup]="filtersForm" (ngSubmit)="submit()">
      <label>
        <span>Fuente</span>
        <input type="text" placeholder="Ej: Bancolombia" formControlName="source" />
      </label>

      <label>
        <span>Categoría</span>
        <select formControlName="category">
          <option value="">Todas</option>
          <option *ngFor="let category of categories" [value]="category">{{ getCategoryLabel(category) }}</option>
        </select>
      </label>

      <label>
        <span>Tipo</span>
        <select formControlName="type">
          <option value="">Todos</option>
          <option *ngFor="let type of types" [value]="type">{{ typeLabelMap[type] }}</option>
        </select>
      </label>

      <label class="checkbox-field">
        <input type="checkbox" formControlName="onlyToday" />
        <span>Solo beneficios para hoy</span>
      </label>

      <div class="actions">
        <button type="button" class="secondary" (click)="clear()">Limpiar búsqueda</button>
        <button type="submit">Aplicar</button>
      </div>
    </form>
  `,
    styles: [
        `
      .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 0.7rem;
      }

      label {
        display: grid;
        gap: 0.35rem;
      }

      .checkbox-field {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        align-self: end;
        min-height: 2.4rem;
      }

      .checkbox-field span {
        margin: 0;
        font-size: 0.85rem;
        font-weight: 500;
        color: #334155;
      }

      input[type='checkbox'] {
        width: 1rem;
        height: 1rem;
      }

      span {
        font-size: 0.78rem;
        font-weight: 600;
        color: #334155;
      }

      input,
      select {
        border: 1px solid #d4d9e8;
        border-radius: 0.65rem;
        padding: 0.58rem 0.7rem;
        background: #f8faff;
        color: #0f172a;
        font-size: 0.9rem;
      }

      input:focus,
      select:focus {
        outline: none;
        border-color: #818cf8;
        box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.15);
      }

      button {
        border: none;
        border-radius: 0.65rem;
        background: linear-gradient(135deg, #4338ca, #0284c7);
        color: #ffffff;
        font-weight: 600;
        min-height: 2.4rem;
        align-self: end;
        cursor: pointer;

        &:hover {
          filter: brightness(1.04);
        }
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        align-self: end;
      }

      .secondary {
        background: #e2e8f0;
        color: #1e293b;
      }
    `,
    ]
})
export class BenefitFiltersComponent {
  @Input() categories: string[] = [];
  @Input() types: BenefitType[] = [];
  @Output() filter = new EventEmitter<BenefitFilters>();

  readonly typeLabelMap = benefitTypeLabelMap;
  readonly getCategoryLabel = getCategoryLabel;

  readonly filtersForm = new FormGroup({
    source: new FormControl<string>(''),
    category: new FormControl<string>(''),
    type: new FormControl<BenefitType | ''>(''),
    onlyToday: new FormControl<boolean>(false, { nonNullable: true }),
  });

  submit(): void {
    const formValue = this.filtersForm.getRawValue();
    this.filter.emit({
      source: formValue.source || undefined,
      category: formValue.category || undefined,
      type: formValue.type || undefined,
      onlyToday: formValue.onlyToday,
    });
  }

  clear(): void {
    this.filtersForm.reset({
      source: '',
      category: '',
      type: '',
      onlyToday: false,
    });
    this.filter.emit({});
  }
}
