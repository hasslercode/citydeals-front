import { Component } from '@angular/core';
import { FormDataFormat } from '../../../../../shared/interfaces/custom-form';
import { SEARCH_SUPERMARKET_FORM } from '../../utils/supermarket-fields';
import { Router } from '@angular/router';
import { SuperMarket } from '../../../domain/model/supermarket.model';
import { LIST_SUPERMARKETS_MOCK } from '../../../../../shared/mocks/supermarkets/supermarket-mock';

@Component({
  selector: 'app-search-supermarkets',
  templateUrl: './search-supermarkets.component.html',
  styleUrls: ['./search-supermarkets.component.scss'],
})
export class SearchSupermarketsComponent {
  formData: FormDataFormat = SEARCH_SUPERMARKET_FORM;
  listSupermarkets: SuperMarket[] = LIST_SUPERMARKETS_MOCK;

  constructor(private router: Router) {}

  searchSupermarket(data: any) {
    const { supermarketName } = data;
    if (supermarketName && supermarketName.trim() !== '') {
      console.log('supermarketName:', supermarketName);
    }
  }

  onEditSuperMarket(supermarket: SuperMarket) {
    console.log('Nueva info de supermarket', supermarket);
  }

  handleAccept(event: any) {
    // Lógica para manejar el evento de aceptar en el modal
  }

  redirectToCreateSupermarket() {
    this.router.navigate(['supermarkets/create']);
  }
}
