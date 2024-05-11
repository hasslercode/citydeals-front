export interface Discount {
  type: string;
  store: string;
  product: string | null;
  category: string | null;
  discount: number;
  start_date: string;
  end_date: string;
  creation_date: string;
  status: string;
}
