import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Craving, Progress } from '../model/mindful-bitest.model';
import { MindfulBitesGateway } from '../gateway/mindful-bites.gateway';

@Injectable({
  providedIn: 'root',
})
export class MindfulBitesUsecase {
  getStartDate(): Observable<any> {
    return this.gateway.getStartDate();
  }
  constructor(private gateway: MindfulBitesGateway) {}

  getProgress(): Observable<Progress> {
    return this.gateway.getProgress();
  }

  getCravings(): Observable<Craving[]> {
    return this.gateway.getCravings();
  }

  registerCraving(craving: string): Observable<any> {
    return this.gateway.registerCraving(craving);
  }

  getAlternatives(): Observable<string[]> {
    return this.gateway.getAlternatives();
  }

  simulateConsequences(craving: string): Observable<any> {
    return this.gateway.simulateConsequences(craving);
  }
}
