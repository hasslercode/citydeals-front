import { FormDataFormat } from "src/app/shared/interfaces/custom-form";


export const REGISTER_CART_FORM: FormDataFormat = {
  header: {
    title: 'Registro de Carrito',
    subtitle: 'Completa la información para agregar un producto al carrito'
  },
  contents: {
    buttonsText: {
      searchButton: 'Registrar',
      cancelButton: ''
    },
    formElements: [
      {
        requestId: 'category',
        required: true,
        label: 'Categoría',
        key: 'category',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'category',
        validators: [
          { type: 'required', value: true, message: 'La Categoría es obligatoria' }
        ],
        options: [
          { label: 'Categoría 1', value: '1' },
          { label: 'Categoría 2', value: '2' },
          { label: 'Categoría 3', value: '3' }
        ]
      },
      {
        requestId: 'product_id',
        required: true,
        label: 'Producto',
        key: 'product_id',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'product_id',
        validators: [
          { type: 'required', value: true, message: 'El Producto es obligatorio' }
        ],
        options: [
          { label: 'Producto 1', value: '1' },
          { label: 'Producto 2', value: '2' },
          { label: 'Producto 3', value: '3' }
        ]
      },
      {
        requestId: 'supermarket_id',
        required: true,
        label: 'Supermercado',
        key: 'supermarket_id',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'supermarket_id',
        validators: [
          { type: 'required', value: true, message: 'El Supermercado es obligatorio' }
        ],
        options: [
          { label: 'Supermercado 1', value: '1' },
          { label: 'Supermercado 2', value: '2' },
          { label: 'Supermercado 3', value: '3' }
        ]
      },
      {
        requestId: 'price',
        required: true,
        label: 'Precio',
        key: 'price',
        enabled: true,
        functionality: 'A',
        type: 'number',
        placeholder: 'Ingrese el precio',
        formControlName: 'price',
        validators: [
          { type: 'required', value: true, message: 'El Precio es obligatorio' }
        ]
      }
    ]
  },
  informationMessage: {
    title: 'Información',
    subtitle: 'Completa todos los campos para agregar un producto al carrito'
  },
  errorMessage: ''
};
