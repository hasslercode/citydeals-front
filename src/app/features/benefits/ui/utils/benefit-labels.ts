import { BenefitType } from '../../domain/enums/benefit-type.enum';

export const benefitTypeLabelMap: Record<BenefitType, string> = {
  [BenefitType.DISCOUNT]: 'Descuento',
  [BenefitType.CASHBACK]: 'Reintegro',
  [BenefitType.INFO]: 'Información',
  [BenefitType.OPPORTUNITY]: 'Oportunidad',
};

const categoryLabelMap: Record<string, string> = {
  supermarket: 'Supermercado',
  transport: 'Transporte',
  health: 'Salud',
  education: 'Educación',
  other: 'Otros',
  retail: 'Retail',
  restaurant: 'Restaurante',
  entertainment: 'Entretenimiento',
  food: 'Comida',
  technology: 'Tecnología',
  travel: 'Viajes',
};

export const getCategoryLabel = (category: string): string =>
  categoryLabelMap[category] ?? category;
