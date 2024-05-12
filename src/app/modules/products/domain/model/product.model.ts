export interface Product {
  id: number;
  name: string;
  description: string;
  image?: string;
  category_id: number;
  status: boolean;
}
