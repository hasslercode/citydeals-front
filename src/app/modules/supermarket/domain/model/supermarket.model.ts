export interface SuperMarket {
  id: number;
  name: string;
  image?: string;
  city_id: number;
  status: boolean;
}

export interface ListSupermarket {
  id:    number;
  name:  string;
  city:  string;
  image: null | string;
}
