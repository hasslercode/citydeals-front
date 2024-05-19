import { FormDataFormat } from "../../../../shared/interfaces/custom-form";

export const PRODUCT_FORM_FIELDS: FormDataFormat = {
  header: {
    title: 'Registro de Producto',
    subtitle: '',
  },
  contents: {
    buttonsText: {
      searchButton: 'Guardar',
      cancelButton: '',
    },
    formElements: [
      {
        requestId: 'name',
        required: true,
        label: 'Nombre del producto',
        placeholder: 'Ingresa el nombre del producto',
        key: 'name',
        enabled: true,
        functionality: '',
        type: 'text',
        formControlName: 'name',
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
        requestId: 'categoryId',
        required: true,
        label: 'Categoría del producto',
        placeholder: 'Selecciona la categoría del producto',
        key: 'categoryId',
        enabled: true,
        functionality: 'select',
        type: 'select',
        formControlName: 'categoryId',
        options: [],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Selecciona una categoría.',
          },
        ],
      },
      {
        requestId: 'description',
        required: false,
        label: 'Descripción del producto',
        placeholder: 'Ingresa la descripción del producto',
        key: 'description',
        enabled: true,
        functionality: '',
        type: 'textarea',
        formControlName: 'description',
        options: [],
        validators: [],
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


export const SEARCH_PRODUCT_FORM: FormDataFormat = {
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
