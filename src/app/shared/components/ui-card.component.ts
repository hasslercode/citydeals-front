import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: block;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 0.75rem;
        padding: 1rem;
      }
    `,
  ],
})
export class UiCardComponent {}
