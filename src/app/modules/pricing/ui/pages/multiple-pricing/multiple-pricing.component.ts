import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListCategory } from 'src/app/modules/category/domain/model/category.model';
import { CategoryUseCase } from 'src/app/modules/category/domain/usecase/category.usecase';
import { ListProduct } from 'src/app/modules/products/domain/model/product.model';
import { ProductsUsecase } from 'src/app/modules/products/domain/usecase/products.usecase';
import { ListSupermarket } from 'src/app/modules/supermarket/domain/model/supermarket.model';
import { SupermarketUseCase } from 'src/app/modules/supermarket/domain/usecase/supermarket.usecase';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PricingUseCase } from '../../../domain/usecase/pricing.usecase';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-multiple-pricing',
  templateUrl: './multiple-pricing.component.html',
  styleUrls: ['./multiple-pricing.component.scss'],
})
export class MultiplePricingComponent {
  @ViewChild('modal') modalInfo!: ModalComponent
  pricingProductForm!: FormGroup;
  supermarkets: ListSupermarket[] = [];
  categories: ListCategory[] = [];
  products: ListProduct[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryUsecase: CategoryUseCase,
    private supermarketUsecase: SupermarketUseCase,
    private productUsecase: ProductsUsecase,
    private pricingUsecase: PricingUseCase,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.pricingProductForm = this.fb.group({
      categoryId: ['', Validators.required],
      productId: ['', Validators.required],
      date: ['', Validators.required],
      prices: this.fb.array([]), // Inicializa el FormArray
    });

    this.loadCategories();
    this.loadSupermarkets();
  }

  // Método para crear un nuevo FormGroup para cada entrada de precio
  createPriceGroup(supermarketId: number): FormGroup {
    return this.fb.group({
      price: [''],
      supermarketId: [supermarketId],
    });
  }

  // Método para agregar una nueva entrada de precio
  addPrice(supermarketId: number): void {
    this.prices.push(this.createPriceGroup(supermarketId));
  }

  // Getter para acceder al FormArray de precios
  get prices(): FormArray {
    return this.pricingProductForm.get('prices') as FormArray;
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.pricingProductForm.valid) {
      const formValue = this.pricingProductForm.value;
      const filteredPrices = formValue.prices.filter(
        (priceGroup: { price: string }) => priceGroup.price !== ''
      );
      const payload = {
        productId: formValue.productId,
        date: formValue.date,
        prices: filteredPrices.map(
          (priceGroup: { price: any; supermarketId: any }) => ({
            price: priceGroup.price,
            supermarket: priceGroup.supermarketId,
          })
        ),
      };

      console.log(payload);
      this.registerPricingProduct(payload);

      // Aquí puedes manejar el envío del formulario
    }
  }

  // Carga las categorías
  loadCategories(): void {
    this.categoryUsecase.getListCategories().subscribe(
      (categories: ListCategory[]) => {
        this.categories = categories;
        console.log('Categories loaded successfully:', categories);
      },
      (error: any) => {
        console.error('Error loading categories:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  // Carga los supermercados
  loadSupermarkets(): void {
    this.supermarketUsecase.getListSupermarket().subscribe(
      (supermarkets: ListSupermarket[]) => {
        this.supermarkets = supermarkets;
        // Inicializa los precios para cada supermercado
        this.supermarkets.forEach((supermarket) =>
          this.addPrice(supermarket.id)
        );
        console.log('Supermarkets loaded successfully:', supermarkets);
      },
      (error: any) => {
        console.error('Error loading supermarkets:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  // Carga los productos según la categoría seleccionada
  loadProducts(categoryId: number): void {
    this.productUsecase.getProductsByCategory(categoryId).subscribe(
      (products: ListProduct[]) => {
        this.products = products;
        console.log('Products loaded successfully:', products);
      },
      (error: any) => {
        console.error('Error loading products:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  onSelectChange() {
    const selectedValue = this.pricingProductForm.value['categoryId'];
    this.loadProducts(selectedValue);
  }

  registerPricingProduct(data: any) {
    this.pricingUsecase.updateMultiplePrice(data).subscribe(
      () => this.handleSuccess(),
      (error) => this.handleError(error)
    );
  }


  showModal(title: string = "Gestión", subtitle: string = "", btnText: string = 'Aceptar') {
    this.setModal();
    this.modalService.showModal(
      title,
      subtitle,
      btnText
    );
  }

  private handleSuccess() {
    console.log('New price created successfully');
    this.showModal('Gestión de precios', 'El precio se ha registrado correctamente.');
  }

  private handleError(error: any) {
    console.error('Error creating new price:', error);
    this.showModal('Gestión de precios', 'El precio no se ha registrado.');
  }

  setModal() {
    this.modalService.setModal(this.modalInfo);
  }
  handleAccept(event: any) {
    this.router.navigate(['/pricing/multiple']);
  }

  // Maneja el cambio de selección en el select de categorías
}
