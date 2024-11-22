import { Observable } from 'rxjs';
import { Craving, Progress } from '../model/mindful-bitest.model';

export abstract class MindfulBitesGateway {
  abstract getProgress(): Observable<Progress>;
  abstract getStartDate(): Observable<any>;
  abstract getCravings(): Observable<Craving[]>;
  abstract registerCraving(craving: string): Observable<any>;
  abstract getAlternatives(): Observable<string[]>;
  abstract simulateConsequences(craving: string): Observable<any>;
}
