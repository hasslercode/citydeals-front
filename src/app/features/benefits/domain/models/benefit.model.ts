import { BenefitType } from '../enums/benefit-type.enum';

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface Benefit {
  id: string;
  title: string;
  type: BenefitType;
  category: string;
  source: string;
  activeFrom: string;
  activeTo: string;
  appliesEveryDay: boolean;
  validDays: WeekDay[];
  termsUrl: string;
  description: string;
}
