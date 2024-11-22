import { Component } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { ChatGptService, ProductInfo } from '../../services/chatgpt.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  extractedText: string = '';
  productName: string = '';
  productPrice: string = '';
  products: ProductInfo[] = [];

  constructor(private chatGptService: ChatGptService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m)
      }).then(({ data: { text } }) => {
        console.log('Texto extraído:', text);

        // Usar el servicio de ChatGPT para procesar el texto
        this.products = this.chatGptService.extractProductInfo(text);
        console.log(this.products);
      });
    }
  }

  extractProductName(text: string): string {
    // Suponiendo que el nombre del producto esté en la primera o segunda línea
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length > 0) {
      return lines[0]; // Primera línea como nombre del producto
    }
    return 'Nombre no encontrado';
  }

  extractProductPrice(text: string): string {
    // Buscar la primera instancia de un precio en el texto
    const regex = /\$\s*\d{1,3}(?:,\d{3})*(?:\.\d{2})?/;
    const match = text.match(regex);
    return match ? match[0].trim() : 'Precio no encontrado';
  }

}
