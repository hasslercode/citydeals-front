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
        requestId: 'categorias',
        required: true,
        label: 'Categoria',
        placeholder: 'Selecciona una categoria',
        key: 'category_id',
        enabled: true,
        functionality: '',
        type: 'select',
        formControlName: 'category_id',
        options: [
          { label: 'Categoria 1', value: 1 },
          { label: 'Categoria 2', value: 2 },
        ],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
      },
      {
        requestId: 'field_id_1',
        required: true,
        label: 'Producto',
        placeholder: 'Selecciona el producto',
        key: 'product_id',
        enabled: true,
        functionality: '',
        type: 'select',
        formControlName: 'product_id',
        options: [
          { label: 'Producto 1', value: 1 },
          { label: 'Producto 2', value: 2 },
        ],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
      },
      {
        requestId: 'field_id_3',
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
        requestId: 'field_id_4',
        required: true,
        label: 'Supermercado',
        placeholder: 'Ingresa el ID del supermercado',
        key: 'supermarket_id',
        enabled: true,
        functionality: '',
        type: 'select',
        formControlName: 'supermarket_id',
        options: [
          { label: 'supermercado 1', value: 1 },
          { label: 'supermercado 2', value: 2 },
        ],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Este campo es obligatorio.',
          },
        ],
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
