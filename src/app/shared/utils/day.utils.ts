import { WeekDay } from '../../features/benefits/domain/models/benefit.model';

export const getCurrentWeekDay = (): WeekDay => {
  const days: WeekDay[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return days[new Date().getDay()];
};
