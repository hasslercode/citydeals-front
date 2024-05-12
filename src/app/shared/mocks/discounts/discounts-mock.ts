import { Discount } from "../../../modules/discounts/domain/model/discount.model";

export const SHOW_DISCOUNTS_MOCK: Discount[] = [];

for (let i = 1; i <= 6; i++) {
  const discount: Discount = {
    id: i,
    type: 'product',
    store: `Store ${i}`,
    product: `Product ${i}`,
    category: `Category ${i}`,
    discount: Math.floor(Math.random() * 20) + 5, // Descuento aleatorio entre 5 y 25
    start_date: '2024-05-01',
    end_date: '2024-05-31',
    creation_date: '2024-04-30',
    status: 'active'
  };
  SHOW_DISCOUNTS_MOCK.push(discount);
}
