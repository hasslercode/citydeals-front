
export interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
  category_id: number;
  status: boolean;
}

export interface ListProduct {
  id:          number;
  name:        string;
  description: string;
  image:       null | string;
}

export interface PricedProductsByCategory {
  id: number;
  name: string;
  description: string;
  image?: string;
  category: Category;
  prices: Price[];
}

interface Price {
  supermarket: Supermarket;
  price: number;
  last_date: Date;
  discount: Discount | null;
}

interface Category {
  id: number;
  name: string;
  status?: boolean;
  image: null;
  city?: string;
}

interface Discount {
  percentage: number;
  discountedPrice: number;
}

interface Supermarket {
  id: number;
  name: string;
  city: string;
  image: null;
}
