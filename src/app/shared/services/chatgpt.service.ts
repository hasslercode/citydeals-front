import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface ProductInfo {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})

export class ChatGptService {

  extractProductInfo(text: string): ProductInfo[] {
    const lines = text.split('\n');
    const products: ProductInfo[] = [];

    lines.forEach((line) => {
      const cleanedLine = line.replace(/[^\w\s,.]/g, '').trim();
      const priceMatch = cleanedLine.match(/(\d+[.,]?\d{0,3})/g);

      if (priceMatch) {
        const price = parseFloat(
          priceMatch[0].replace(',', '').replace('.', '')
        );
        const name = cleanedLine.replace(priceMatch[0], '').trim();

        if (name && !isNaN(price)) {
          products.push({
            name: this.cleanProductName(name),
            price: price,
          });
        }
      }
    });

    return products;
  }

  private cleanProductName(name: string): string {
    return name.replace(/\s+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

}
