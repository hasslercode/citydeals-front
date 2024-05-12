import { PricingProduct } from "src/app/modules/pricing/domain/model/pricing.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
  category_id: number;
  status: boolean;
  pricing?: PricingProduct[]
}
