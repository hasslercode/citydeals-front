import { Component, OnInit } from '@angular/core';
import { MindfulBitesUsecase } from '../../../domain/usecase/mindful-bites.usecase';
import { Progress, Craving } from '../../../domain/model/mindful-bitest.model';

@Component({
  selector: 'app-mindful-bites',
  templateUrl: './mindful-bites.component.html',
  styleUrls: ['./mindful-bites.component.scss'],
})
export class MindfulBitesComponent implements OnInit {
  progress: Progress = { daysWithoutGivingIn: 0, caloriesSaved: 0 };
  cravings: Craving[] = [];
  alternatives: string[] = [];
  startDate: string = '';
  daysWithChallenge: string = '';
  kilosSaved: string = '';
  loading: boolean = true;
  error: boolean = false;

  constructor(private usecase: MindfulBitesUsecase) {}

  ngOnInit() {
    this.loadData();
  }
  registerCraving() {
    const cravingText = prompt('¿Qué antojo tienes ahora?');
    if (cravingText) {
      this.usecase.registerCraving(cravingText).subscribe({
        next: () => {
          alert('¡Antojo registrado! Resiste con una alternativa saludable.');
          this.loadData();
          this.simulateConsequences();
        },
        error: () => {
          alert('Error al registrar el antojo. Intenta nuevamente.');
        },
      });
    }
  }

  simulateConsequences() {
    if (this.cravings.length > 0) {
      const lastCraving = this.cravings[this.cravings.length - 1];
      this.usecase.simulateConsequences(lastCraving.craving).subscribe({
        next: (response: { message: string }) => {
          alert(`Consecuencias: ${response.message}`);
        },
        error: () => {
          alert('Error al simular las consecuencias. Intenta nuevamente.');
        },
      });
    } else {
      alert('No hay antojos registrados para simular las consecuencias.');
    }
  }


  loadData() {
    const timeout = setTimeout(() => {
      this.error = true;
      this.loading = false;
    }, 10000);

    this.usecase.getProgress().subscribe({
      next: (progress: Progress) => {
        this.progress = progress;
        this.kilosSaved = this.calculateKilosSaved(progress.caloriesSaved);
        this.checkLoading(timeout);
      },
      error: () => this.handleError(timeout),
    });

    this.usecase.getStartDate().subscribe({
      next: (startDate: string) => {
        this.startDate = startDate;
        this.daysWithChallenge = this.calculateDaysWithChallenge(startDate);
        this.checkLoading(timeout);
      },
      error: () => this.handleError(timeout),
    });

    this.usecase.getCravings().subscribe({
      next: (cravings: Craving[]) => {
        this.cravings = cravings;
        this.checkLoading(timeout);
      },
      error: () => this.handleError(timeout),
    });

    this.usecase.getAlternatives().subscribe({
      next: (alternatives: string[]) => {
        this.alternatives = alternatives;
        this.checkLoading(timeout);
      },
      error: () => this.handleError(timeout),
    });
  }

  private calculateKilosSaved(calories: number): string {
    const kilos = calories / 7700;
    return kilos.toFixed(2); // Devuelve el número con 2 decimales
  }

  private calculateDaysWithChallenge(startDate: string): string {
    const start = new Date(startDate.split('/').reverse().join('/'));
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);
      return `${years} año${years > 1 ? 's' : ''}`;
    } else if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} mes${months > 1 ? 'es' : ''}`;
    } else {
      return `${diffDays} día${diffDays > 1 ? 's' : ''}`;
    }
  }

  private checkLoading(timeout: NodeJS.Timeout) {
    if (this.progress && this.startDate && this.cravings.length >= 0) {
      clearTimeout(timeout);
      this.loading = false;
    }
  }

  private handleError(timeout: NodeJS.Timeout) {
    clearTimeout(timeout);
    this.error = true;
    this.loading = false;
  }
}
