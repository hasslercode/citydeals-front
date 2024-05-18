
export interface PricedProductsByCategory {
  id:          number;
  name:        string;
  description: string;
  category:    Category;
  prices:      Price[];
}

interface Price {
  supermarket: Category;
  price:       number;
  discount:    Discount | null;
}

interface Category {
  id:      number;
  name:    string;
  status?: boolean;
  image:   null;
  city?:   string;
}

interface Discount {
  percentage:      number;
  discountedPrice: number;
}

interface Supermarket {
  id:    number;
  name:  string;
  city:  string;
  image: null;
}
