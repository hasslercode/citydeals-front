import { PricingProduct } from 'src/app/modules/pricing/domain/model/pricing.model';
import { Product } from '../../../modules/products/domain/model/product.model';

export const LIST_PRICING_PRODUCTS_MOCK: PricingProduct[] = [];

for (let i = 1; i <= 4; i++) {
  LIST_PRICING_PRODUCTS_MOCK.push({
    id: i,
    product_id: i,
    update_date: new Date().toISOString(),
    price: Math.floor(Math.random() * 30000) + 1,
    supermarket_id: i % 3 + 1,
  });
}

export const LIST_PRODUCTS_MOCK: Product[] = [];

for (let i = 1; i <= 10; i++) {
  LIST_PRODUCTS_MOCK.push({
    id: i,
    name: `Producto ${i}`,
    image: `/assets/images/defaultImage.jpg`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia condimentum odio eu dictum. Praesent eu libero non nulla rhoncus. ${i}`,
    category_id: (i % 3) + 1,
    status: i % 2 === 0 ? true : false
  });
}

export const LIST_PRODUCTS_WITH_PRICING_MOCK: Product[] = [];

for (let i = 1; i <= 10; i++) {
  LIST_PRODUCTS_WITH_PRICING_MOCK.push({
    id: i,
    name: `Producto ${i}`,
    image: `/assets/images/defaultImage.jpg`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia condimentum odio eu dictum. Praesent eu libero non nulla rhoncus. ${i}`,
    category_id: (i % 3) + 1,
    status: i % 2 === 0 ? true : false,
  });
}

export const ONE_PRODUCT_MOCK: Product = {
  id: 1,
  name: 'Producto 1',
  description: 'Descripción del Producto 1',
  image: `/assets/images/defaultImage.jpg`,
  category_id: 1,
  status: true,
};


