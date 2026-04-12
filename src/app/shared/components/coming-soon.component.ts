import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  template: `
    <section class="coming-soon">
      <h2>{{ title }}</h2>
      <p>Esta feature está preparada en arquitectura y se implementará luego.</p>
    </section>
  `,
  styles: [
    `
      .coming-soon {
        border: 1px dashed #cbd5e1;
        border-radius: 0.75rem;
        padding: 1rem;
        background: #ffffff;
      }

      h2 {
        margin-top: 0;
      }
    `,
  ],
})
export class ComingSoonComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] as string;
}
