import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  template: '<button type="button"><ng-content></ng-content></button>',
  styles: [
    `
      button {
        border: none;
        border-radius: 0.5rem;
        background: #2563eb;
        color: #ffffff;
        padding: 0.55rem 0.9rem;
        cursor: pointer;
      }
    `,
  ],
})
export class UiButtonComponent {}
