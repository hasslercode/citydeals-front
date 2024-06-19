import { Component, OnInit } from '@angular/core';
import { FormDataFormat } from '../../../../../shared/interfaces/custom-form';
import { SEARCH_SUPERMARKET_FORM } from '../../utils/supermarket-fields';
import { Router } from '@angular/router';
import { ListSupermarket, SuperMarket } from '../../../domain/model/supermarket.model';
import { SupermarketUseCase } from '../../../domain/usecase/supermarket.usecase';

@Component({
  selector: 'app-search-supermarkets',
  templateUrl: './search-supermarkets.component.html',
  styleUrls: ['./search-supermarkets.component.scss'],
})
export class SearchSupermarketsComponent implements OnInit {
  formData: FormDataFormat = SEARCH_SUPERMARKET_FORM;
  supermarkets: ListSupermarket[] = [];

  constructor(private router: Router,
    private supermarketUsecase: SupermarketUseCase,
  ) {}
  ngOnInit(): void {
      this.loadSupermarkets();
  }

  loadSupermarkets(): void {
    this.supermarketUsecase.getListSupermarket().subscribe(
      (supermarkets: ListSupermarket[]) => {
        this.supermarkets = supermarkets;
        console.log('supermarkets loaded successfully:', supermarkets);
      },
      (error) => {
        console.error('Error loading supermarkets:', error);
      }
    );
  }
  searchSupermarket(data: any) {
    const { supermarketName } = data;
    if (supermarketName && supermarketName.trim() !== '') {
      console.log('supermarketName:', supermarketName);
    }
  }

  onEditSuperMarket(supermarket: ListSupermarket) {
    console.log('Nueva info de supermarket', supermarket);
  }

  handleAccept(event: any) {
    // Lógica para manejar el evento de aceptar en el modal
  }

  redirectToCreateSupermarket() {
    this.router.navigate(['supermarkets/create']);
  }
}
