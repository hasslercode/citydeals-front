import { Pipe, PipeTransform } from '@angular/core';

const dayMap: Record<string, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

@Pipe({
  name: 'dayLabel',
  standalone: true,
})
export class DayLabelPipe implements PipeTransform {
  transform(value: string): string {
    return dayMap[value] ?? value;
  }
}
