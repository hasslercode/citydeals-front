export type SourceKind = 'bank' | 'card' | 'store' | 'program' | 'other';

export interface BenefitSource {
  id: string;
  name: string;
  kind: SourceKind;
  color: string;
}

export interface BenefitSourceFile extends BenefitSource {
  file: string;
}
