import { Component } from '@angular/core';
import { PricedProductsByCategory } from 'src/app/modules/products/domain/model/product.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    standalone: false
})
export class ShoppingListComponent {
  shoppingList: PricedProductsByCategory[] = [];
  optimalRoutes: any[] = [];
  totalGeneral: number = 0;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList();
    this.optimalRoutes = this.shoppingListService.getOptimalRoutes();
    this.calculateOptimalRoutes();
  }

  removeFromShoppingList(product: PricedProductsByCategory): void {
    this.shoppingListService.removeFromShoppingList(product);
    this.shoppingList = this.shoppingListService.getShoppingList();
    this.optimalRoutes = this.shoppingListService.getOptimalRoutes();
    this.calculateOptimalRoutes();
  }

  clearShoppingList(): void {
    this.shoppingListService.clearShoppingList();
    this.shoppingList = [];
    this.optimalRoutes = [];
  }


  sortedPrices(product: PricedProductsByCategory) {
    return product.prices.sort((a, b) => (a.price - b.price));
  }

  calculateOptimalRoutes(): void {
    const storeMap = new Map<string, { store: string, total: number, products: any[] }>();

    this.shoppingList.forEach(product => {
      const bestPrice = this.sortedPrices(product)[0];
      const storeName = bestPrice.supermarket.name;

      if (!storeMap.has(storeName)) {
        storeMap.set(storeName, { store: storeName, total: 0, products: [] });
      }

      const storeEntry = storeMap.get(storeName)!;
      storeEntry.total += bestPrice.price;
      storeEntry.products.push({
        name: product.name,
        price: bestPrice.price,
        discountedPrice: bestPrice.discount ? bestPrice.discount.discountedPrice : null
      });
    });

    this.optimalRoutes = Array.from(storeMap.values());
    this.totalGeneral = this.optimalRoutes.reduce((acc, route) => acc + route.total, 0);
  }
}
