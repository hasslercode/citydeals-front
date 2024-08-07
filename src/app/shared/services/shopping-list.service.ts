// src/app/services/shopping-list.service.ts
import { Injectable } from '@angular/core';
import { PricedProductsByCategory } from 'src/app/modules/products/domain/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private products: PricedProductsByCategory[] = [];
  private shoppingList: PricedProductsByCategory[];

  constructor() {
    this.shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
  }

  getProducts() {
    return this.products;
  }

  addToShoppingList(product: PricedProductsByCategory): void {
    if (!this.shoppingList.find(p => p.id === product.id)) {
      this.shoppingList.push(product);
      this.updateLocalStorage();
    }
  }

  getShoppingList(): PricedProductsByCategory[] {
    return this.shoppingList;
  }

  removeFromShoppingList(product: PricedProductsByCategory): void {
    this.shoppingList = this.shoppingList.filter(p => p.id !== product.id);
    this.updateLocalStorage();
  }

  optimizeShoppingList() {
    return this.shoppingList.map(product => {
      const bestPriceEntry = product.prices.reduce((prev, curr) => (prev.price < curr.price ? prev : curr));
      return {
        name: product.name,
        store: bestPriceEntry.supermarket.name,
        price: bestPriceEntry.price
      };
    });
  }

  clearShoppingList(): void {
    this.shoppingList = [];
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
  }

  getOptimalRoutes() {
    const supermarketProducts = this.shoppingList.reduce((acc, product) => {
      product.prices.forEach(price => {
        if (!acc[price.supermarket.name]) {
          acc[price.supermarket.name] = [];
        }
        acc[price.supermarket.name].push({
          name: product.name,
          price: price.price,
          discountedPrice: price.discount ? price.discount.discountedPrice : null
        });
      });
      return acc;
    }, {} as Record<string, { name: string; price: number; discountedPrice: number | null }[]>);

    const routes = Object.entries(supermarketProducts).map(([store, products]) => {
      // Remove duplicate products and keep the cheapest option
      const uniqueProducts = products.reduce((acc, product) => {
        const existingProduct = acc.find(p => p.name === product.name);
        if (!existingProduct || (product.discountedPrice !== null ? product.discountedPrice : product.price) < (existingProduct.discountedPrice !== null ? existingProduct.discountedPrice : existingProduct.price)) {
          acc = acc.filter(p => p.name !== product.name);
          acc.push(product);
        }
        return acc;
      }, [] as { name: string; price: number; discountedPrice: number | null }[]);

      const total = uniqueProducts.reduce((sum, product) => {
        return sum + (product.discountedPrice !== null ? product.discountedPrice : product.price);
      }, 0);

      return {
        store,
        products: uniqueProducts,
        total
      };
    });

    return routes;
  }
}
