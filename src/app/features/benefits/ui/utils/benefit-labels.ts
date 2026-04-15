import { BenefitType } from '../../domain/enums/benefit-type.enum';

export const benefitTypeLabelMap: Record<BenefitType, string> = {
  [BenefitType.DISCOUNT]: 'Descuento',
  [BenefitType.CASHBACK]: 'Reintegro',
  [BenefitType.INFO]: 'Información',
  [BenefitType.OPPORTUNITY]: 'Oportunidad',
};

export interface TypeStyle {
  primary: string;
  light: string;
  gradient: string;
}

export const benefitTypeStyleMap: Record<BenefitType, TypeStyle> = {
  [BenefitType.DISCOUNT]:    { primary: '#16a34a', light: '#dcfce7', gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' },
  [BenefitType.CASHBACK]:    { primary: '#d97706', light: '#fef3c7', gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' },
  [BenefitType.OPPORTUNITY]: { primary: '#7c3aed', light: '#ede9fe', gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' },
  [BenefitType.INFO]:        { primary: '#0284c7', light: '#e0f2fe', gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' },
};

const categoryLabelMap: Record<string, string> = {
  supermarket:   'Supermercado',
  transport:     'Transporte',
  fuel:          'Gasolina',
  health:        'Salud',
  education:     'Educación',
  other:         'Otros',
  retail:        'Retail',
  restaurant:    'Restaurantes',
  entertainment: 'Entretenimiento',
  food:          'Comida',
  technology:    'Tecnología',
  travel:        'Viajes',
};

export const getCategoryLabel = (category: string): string =>
  categoryLabelMap[category] ?? category;

export const categoryIconMap: Record<string, string> = {
  supermarket:   '🛒',
  transport:     '🚗',
  fuel:          '⛽',
  health:        '💊',
  restaurant:    '🍽️',
  retail:        '🛍️',
  other:         '📦',
  education:     '📚',
  entertainment: '🎬',
  technology:    '💻',
  travel:        '✈️',
};

export const getCategoryIcon = (category: string): string =>
  categoryIconMap[category] ?? '📦';

export const sourceColorMap: Record<string, string> = {
  'Bancolombia':            '#FDB931',
  'Mastercard':             '#EB001B',
  'Mastercard Priceless':   '#EB001B',
  'Nu Bank':                '#820AD1',
  'Banco Falabella':        '#008751',
  'BBVA':                   '#004481',
  'Davivienda':             '#C8102E',
  'Banco de Occidente':     '#0066CC',
  'AV Villas':              '#0057A8',
  'Olímpica':               '#E31837',
  'Tarjeta Olímpica':       '#E31837',
  'American Express':       '#007BBF',
  'Terpel':                 '#F39325',
  'Scotiabank Colpatria':   '#EC111A',
  'Convenio Policía Nacional': '#006341',
};

export const getSourceColor = (source: string): string =>
  sourceColorMap[source] ?? '#64748b';

export const getSourceInitials = (source: string): string => {
  const words = source.trim().split(/\s+/);
  if (words.length === 1) return source.slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
};

export const extractHighlight = (title: string): string => {
  const pct = title.match(/(\d+%)/);
  if (pct) return pct[1];
  const xfor = title.match(/(\d+[xX]\d+)/);
  if (xfor) return xfor[1];
  const amount = title.match(/(\$[\d.,]+)/);
  if (amount) return amount[1];
  return '';
};

// Rich dark gradients for each source bank/franchise card
export const sourceGradientMap: Record<string, string> = {
  'Bancolombia':               'linear-gradient(135deg, #1a3a8f 0%, #2563eb 80%, #1d4ed8 100%)',
  'Mastercard':                'linear-gradient(135deg, #1a1a2e 0%, #7c2d12 60%, #dc2626 100%)',
  'Mastercard Priceless':      'linear-gradient(135deg, #1a1a2e 0%, #7c2d12 60%, #dc2626 100%)',
  'Nu Bank':                   'linear-gradient(135deg, #2d1b69 0%, #820AD1 60%, #a855f7 100%)',
  'Banco Falabella':           'linear-gradient(135deg, #0a2e1a 0%, #008751 60%, #16a34a 100%)',
  'BBVA':                      'linear-gradient(135deg, #0c1f3f 0%, #004481 60%, #6d28d9 100%)',
  'Davivienda':                'linear-gradient(135deg, #4c0519 0%, #9f0f2f 60%, #c8102e 100%)',
  'Banco de Occidente':        'linear-gradient(135deg, #0c2340 0%, #0066CC 70%, #3b82f6 100%)',
  'AV Villas':                 'linear-gradient(135deg, #0a1e40 0%, #0057A8 60%, #3b82f6 100%)',
  'Olímpica':                  'linear-gradient(135deg, #450a0a 0%, #E31837 60%, #f43f5e 100%)',
  'Tarjeta Olímpica':          'linear-gradient(135deg, #450a0a 0%, #E31837 60%, #f43f5e 100%)',
  'American Express':          'linear-gradient(135deg, #0c2340 0%, #007BBF 60%, #0ea5e9 100%)',
  'Terpel':                    'linear-gradient(135deg, #431407 0%, #F39325 60%, #fbbf24 100%)',
  'Scotiabank Colpatria':      'linear-gradient(135deg, #450a0a 0%, #EC111A 60%, #f43f5e 100%)',
  'Convenio Policía Nacional': 'linear-gradient(135deg, #0a1f0a 0%, #006341 60%, #16a34a 100%)',
};

export const getSourceGradient = (source: string): string =>
  sourceGradientMap[source] ?? 'linear-gradient(135deg, #1e293b 0%, #475569 100%)';

export const cardTypeLabelMap: Record<string, string> = {
  credit:     'Crédito',
  mastercard: 'Mastercard',
  visa:       'Visa',
  amex:       'American Express',
  debit:      'Débito',
};

export const getCardTypeLabel = (cardType: string | null): string =>
  cardType ? (cardTypeLabelMap[cardType] ?? cardType) : 'Múltiple';
