import { FormDataFormat } from "../../../../shared/interfaces/custom-form";

export const SUPERMARKET_FORM_FIELDS: FormDataFormat = {
  header: {
    title: 'Registro de Supermercado',
    subtitle: '',
  },
  contents: {
    buttonsText: {
      searchButton: 'Guardar',
      cancelButton: '',
    },
    formElements: [
      {
        requestId: 'field_id_1',
        required: true,
        label: 'Nombre del supermercado',
        placeholder: 'Ingresa el nombre del supermercado',
        key: 'supermarket_name',
        enabled: true,
        functionality: '',
        type: 'text',
        formControlName: 'supermarket_name',
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
        requestId: 'field_id_2',
        required: true,
        label: 'Ciudad del supermercado',
        placeholder: 'Selecciona la ciudad del supermercado',
        key: 'supermarket_city',
        enabled: true,
        functionality: 'select',
        type: 'select',
        formControlName: 'supermarket_city',
        options: [
          { label: 'Bogotá', value: 1 },
          { label: 'Medellín', value: 2 },
          { label: 'Cali', value: 3 },
        ],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Selecciona una ciudad.',
          },
        ],
      }
    ],
  },
  informationMessage: {
    title: 'Mensaje de información',
    subtitle: 'Este es un mensaje de información.',
  },
  errorMessage:
    'Se han encontrado errores en la entrada de datos. Por favor, corrige los campos resaltados.',
};


export const SEARCH_SUPERMARKET_FORM: FormDataFormat = {
  header: {
    title: 'Buscar Supermercado',
    subtitle: 'Utiliza el formulario para buscar un supermercado:'
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
        key: 'supermarketName',
        enabled: true,
        functionality: 'search',
        type: 'text',
        formControlName: 'supermarketName',
        validators: [],
        placeholder: 'Ingresa el nombre del supermercado'
      }
    ]
  },
  informationMessage: {
    title: 'Información',
    subtitle: 'Resultado de la búsqueda'
  },
  errorMessage: ''
};
