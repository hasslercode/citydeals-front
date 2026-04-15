import { BenefitType } from '../enums/benefit-type.enum';

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type CardType = 'credit' | 'mastercard' | 'amex' | 'visa' | 'debit';
export type CardLevel = 'black' | 'gold' | 'platinum' | 'classic';

export interface Benefit {
  id: string;
  title: string;
  type: BenefitType;
  category: string;
  source: string;
  cardType: CardType | null;
  cardLevel: CardLevel | null;
  activeFrom: string;
  activeTo: string;
  appliesEveryDay: boolean;
  validDays: WeekDay[];
  termsUrl: string;
  description: string;
}
