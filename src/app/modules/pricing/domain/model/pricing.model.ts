export interface PricingProduct {
  id: number;
  product_id: number;
  update_date: string;
  price: number;
  supermarket_id: number;
}

export interface UpdatePrice {
  productId:     number;
  date:          Date;
  price:         number;
  supermarketId: number;
}
