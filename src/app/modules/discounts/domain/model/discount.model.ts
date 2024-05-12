export interface Discount {
  id: number,
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

export interface DiscountDay {
  id: number;
  discount_id: number,
  day_of_week: number,
  status: boolean
}
