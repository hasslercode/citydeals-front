export interface Source {
  id: string;
  name: string;
  kind: 'bank' | 'store' | 'wallet' | 'other';
}
