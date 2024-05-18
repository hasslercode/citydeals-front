
export interface DiscountsToday {
  id:         number;
  type:       string;
  percentage: number;
  date_start: Date;
  date_end:   Date;
  created_at: Date;
  supermarket: DiscountInfo;
  status:     boolean;
  product:    DiscountInfo | null;
  category:   DiscountInfo | null;
}

interface DiscountInfo {
  id:           number;
  name:         string;
  status?:      boolean;
  image:        null;
  description?: string;
  city?:        string;
}

export interface NewDiscount {
  type:          string;
  supermarketId: number;
  categoryId:    number | null;
  productId:    number | null;
  percentage:    number;
  date_start:    Date;
  date_end:      Date;
  days_week:     number[];
}
