import { FormDataFormat } from "../../../../../shared/interfaces/custom-form";

export const PRICING_PRODUCT_FORM_FIELDS: FormDataFormat = {
  header: {
    title: 'Registro de Precio de Producto',
    subtitle: '',
  },
  contents: {
    buttonsText: {
      searchButton: 'Guardar',
      cancelButton: '',
    },
    formElements: [
      {
        requestId: 'categoryId',
        required: true,
        label: 'Categoria',
        placeholder: 'Selecciona una categoria',
        key: 'categoryId',
        enabled: true,
        functionality: '',
        type: 'select',
        formControlName: 'categoryId',
        options: [],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
      },
      {
        requestId: 'productId',
        required: true,
        label: 'Producto',
        placeholder: 'Selecciona el producto',
        key: 'productId',
        enabled: true,
        functionality: '',
        type: 'select',
        formControlName: 'productId',
        options: [],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
      },
      {
        requestId: 'supermarketId',
        required: true,
        label: 'Supermercado',
        placeholder: 'Ingresa el ID del supermercado',
        key: 'supermarketId',
        enabled: true,
        functionality: '',
        type: 'select',
        formControlName: 'supermarketId',
        options: [ ],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
      },
      {
        requestId: 'price',
        required: true,
        label: 'Precio del Producto',
        placeholder: 'Ingresa el precio del producto',
        key: 'price',
        enabled: true,
        functionality: '',
        type: 'number',
        formControlName: 'price',
        options: [],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
      },
      {
        requestId: 'date',
        required: true,
        label: 'Fecha',
        key: 'date',
        enabled: true,
        functionality: 'A',
        type: 'date',
        placeholder: 'Ingresa la fecha',
        formControlName: 'date',
        validators: [
          { type: 'required', value: true, message: 'La Fecha es obligatoria' }
        ]
      },
    ],
  },
  informationMessage: {
    title: 'Mensaje de información',
    subtitle: 'Este es un mensaje de información.',
  },
  errorMessage:
    'Se han encontrado errores en la entrada de datos. Por favor, corrige los campos resaltados.',
};

export const SEARCH_PRICING_PRODUCT_FORM: FormDataFormat = {
  header: {
    title: 'Buscar Producto',
    subtitle: 'Utiliza el formulario para buscar un producto:'
  },
  contents: {
    buttonsText: {
      searchButton: 'Buscar',
      cancelButton: ''
    },
    formElements: [
      {
        requestId: 'search',
        required: true,
        label: '',
        key: 'productName',
        enabled: true,
        functionality: 'search',
        type: 'text',
        formControlName: 'productName',
        validators: [],
        placeholder: 'Ingresa el nombre del producto'
      }
    ]
  },
  informationMessage: {
    title: 'Información',
    subtitle: 'Resultado de la búsqueda'
  },
  errorMessage: ''
};
