import { SuperMarket } from "../../../modules/supermarket/domain/model/supermarket.model";


export const LIST_SUPERMARKETS_MOCK: SuperMarket[] = [];

for (let i = 1; i <= 10; i++) {
  LIST_SUPERMARKETS_MOCK.push({
    id: i,
    name: `Supermercado ${i}`,
    image: `/assets/images/defaultImage.jpg`,
    city_id: i % 2 === 0 ? 1 : 2,
    status: i % 2 === 0 ? true : false,
  });
}

export const ONE_SUPERMARKET_MOCK: SuperMarket = {
  id: 1,
  name: 'Supermercado 1',
  image: `/assets/images/defaultImage.jpg`,
  city_id: 1,
  status: true,
};
