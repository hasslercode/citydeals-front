import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MindfulBitesGateway } from '../../domain/gateway/mindful-bites.gateway';
import { Craving, Progress } from '../../domain/model/mindful-bitest.model';

@Injectable({
  providedIn: 'root',
})
export class MindfulBitesService extends MindfulBitesGateway {
  private progressKey = 'mindfulBitesProgress';
  private cravingsKey = 'mindfulBitesCravings';
  private alternativesKey = 'mindfulBitesAlternatives';
  private startDateKey = 'mindfulBitesStartDate';

  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    if (!localStorage.getItem(this.progressKey)) {
      const initialProgress: Progress = { daysWithoutGivingIn: 0, caloriesSaved: 0 };
      localStorage.setItem(this.progressKey, JSON.stringify(initialProgress));
    }

    if (!localStorage.getItem(this.cravingsKey)) {
      localStorage.setItem(this.cravingsKey, JSON.stringify([]));
    }

    if (!localStorage.getItem(this.alternativesKey)) {
      const initialAlternatives = [
        'Manzana con canela', 'Té verde', '10 sentadillas', 'Puñado de almendras',
        'Vaso de agua con limón', 'Caminata de 5 minutos', 'Infusión de menta',
        'Pepino con limón', 'Zanahorias con hummus', 'Batido de frutas natural',
        'Respiración profunda', 'Una taza de café sin azúcar', '10 saltos de estrella',
        'Escribir metas en un diario', 'Escuchar tu canción favorita'
      ];
      localStorage.setItem(this.alternativesKey, JSON.stringify(initialAlternatives));
    }

    if (!localStorage.getItem(this.startDateKey)) {
      const today = this.formatDate(new Date());
      localStorage.setItem(this.startDateKey, today);
    }
  }

  getCalories(): any[] {
    return [
      { name: 'hamburguesa', calories: 450 },
      { name: 'papas fritas', calories: 350 },
      { name: 'pizza', calories: 400 },
      { name: 'perro caliente', calories: 500 },
      { name: 'gaseosa', calories: 150 },
      { name: 'helado', calories: 300 },
      { name: 'donas', calories: 350 },
      { name: 'nachos', calories: 400 },
      { name: 'chocolate', calories: 200 },
    ];
  }

  private calculateCalories(craving: string): number {
    const cravingLower = craving.toLowerCase();
    const match = this.getCalories().find((item) => cravingLower.includes(item.name));
    return match ? match.calories : Math.floor(Math.random() * (500 - 300 + 1)) + 300;
  }

  private updateCalories(craving: string) {
    const progress = localStorage.getItem(this.progressKey);
    if (progress) {
      const parsedProgress: Progress = JSON.parse(progress);
      const caloriesToAdd = this.calculateCalories(craving);
      parsedProgress.caloriesSaved += caloriesToAdd;

      // Guardar progreso actualizado en LocalStorage
      localStorage.setItem(this.progressKey, JSON.stringify(parsedProgress));
    }
  }

  private updateDays() {
    const progress = localStorage.getItem(this.progressKey);
    const cravings = localStorage.getItem(this.cravingsKey);
    const today = this.formatDate(new Date());

    if (progress && cravings) {
      const parsedProgress: Progress = JSON.parse(progress);
      const parsedCravings: Craving[] = JSON.parse(cravings);

      // Si no hay ningún antojo registrado para el día de hoy, incrementar los días sin caer
      if (!parsedCravings.some((c) => c.date === today)) {
        parsedProgress.daysWithoutGivingIn += 1;
        localStorage.setItem(this.progressKey, JSON.stringify(parsedProgress));
      }
    }
  }

  registerCraving(craving: string): Observable<any> {
    const cravings = localStorage.getItem(this.cravingsKey);
    const today = this.formatDate(new Date());

    if (cravings) {
      const parsedCravings: Craving[] = JSON.parse(cravings);

      // Actualizar progreso de días si es un nuevo día
      this.updateDays();

      // Registrar calorías ahorradas por el antojo
      this.updateCalories(craving);

      // Agregar el nuevo antojo con la fecha actual
      const updatedCravings: Craving[] = [...parsedCravings, { craving, date: today }];
      localStorage.setItem(this.cravingsKey, JSON.stringify(updatedCravings));

      return of({ message: 'Antojo registrado con éxito' });
    }
    return throwError(() => new Error('No se pudo registrar el antojo'));
  }

  simulateConsequences(craving: string): Observable<any> {
    const calories = this.calculateCalories(craving);
    const message = `Ceder al antojo "${craving}" añadiría aproximadamente ${calories} calorías extra hoy. ¡Resiste y estarás más cerca de tu meta!`;
    return of({ message });
  }

  getProgress(): Observable<Progress> {
    const progress = localStorage.getItem(this.progressKey);
    return progress ? of(JSON.parse(progress)) : throwError(() => new Error('No se pudo cargar el progreso'));
  }

  getStartDate(): Observable<string> {
    const startDate = localStorage.getItem(this.startDateKey);
    return startDate ? of(startDate) : throwError(() => new Error('No se pudo cargar la fecha de inicio'));
  }

  getCravings(): Observable<Craving[]> {
    const cravings = localStorage.getItem(this.cravingsKey);
    return cravings ? of(JSON.parse(cravings)) : throwError(() => new Error('No se pudo cargar los antojos'));
  }

  getAlternatives(): Observable<string[]> {
    const alternatives = localStorage.getItem(this.alternativesKey);
    return alternatives ? of(JSON.parse(alternatives)) : throwError(() => new Error('No se pudo cargar las alternativas'));
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
