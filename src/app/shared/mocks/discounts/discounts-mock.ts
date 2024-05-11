import { Discount } from "../../../modules/discounts/domain/model/discount.model";

export const SHOW_DISCOUNTS_MOCK: Discount[] = [
  {
    type: 'product',
    store: 'Store 1',
    product: 'Product 1',
    category: 'Category 1',
    discount: 10,
    start_date: '2024-05-12',
    end_date: '2024-05-15',
    creation_date: '2024-05-10',
    status: 'active'
  },
  {
    type: 'product',
    store: 'Store 2',
    product: 'Product 2',
    category: 'Category 2',
    discount: 20,
    start_date: '2024-05-10',
    end_date: '2024-05-20',
    creation_date: '2024-05-05',
    status: 'active'
  },
  {
    type: 'product',
    store: 'Store 3',
    product: 'Product 3',
    category: 'Category 3',
    discount: 15,
    start_date: '2024-05-08',
    end_date: '2024-05-18',
    creation_date: '2024-05-03',
    status: 'active'
  },
  {
    type: 'product',
    store: 'Store 4',
    product: 'Product 4',
    category: 'Category 4',
    discount: 25,
    start_date: '2024-05-11',
    end_date: '2024-05-17',
    creation_date: '2024-05-06',
    status: 'active'
  },
  {
    type: 'category',
    store: 'Store 5',
    product: null,
    category: 'Category 5',
    discount: 30,
    start_date: '2024-05-09',
    end_date: '2024-05-16',
    creation_date: '2024-05-04',
    status: 'active'
  },
  {
    type: 'category',
    store: 'Store 6',
    product: null,
    category: 'Category 6',
    discount: 5,
    start_date: '2024-05-07',
    end_date: '2024-05-14',
    creation_date: '2024-05-02',
    status: 'active'
  }
];
