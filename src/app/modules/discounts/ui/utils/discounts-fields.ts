import { FormDataFormat } from "src/app/shared/interfaces/custom-form";

export const DISCOUNT_FORM_FIELDS: FormDataFormat = {
  header: {
    title: 'Agregar Descuento',
    subtitle: 'Complete la información para agregar un descuento'
  },
  contents: {
    buttonsText: {
      searchButton: 'Guardar',
      cancelButton: ''
    },
    formElements: [
      {
        requestId: 'supermarketId',
        required: true,
        label: 'Supermercado',
        key: 'supermarketId',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'supermarketId',
        validators: [
          { type: 'required', value: true, message: 'El Supermercado es obligatorio' }
        ],
        options: []
      },
      {
        requestId: 'categoryId',
        required: false,
        label: 'Categoria',
        key: 'categoryId',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'categoryId',
        validators: [],
        options: []
      },
      {
        requestId: 'productId',
        required: false,
        label: 'Producto',
        key: 'productId',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'productId',
        validators: [],
        options: []
      },
      {
        requestId: 'percentage',
        required: true,
        label: 'Descuento',
        key: 'percentage',
        enabled: true,
        functionality: 'A',
        placeholder: 'Ingresa el descuento',
        type: 'number',
        formControlName: 'percentage',
        validators: [
          { type: 'required', value: true, message: 'El Descuento es obligatorio' }
        ]
      },
      {
        requestId: 'date_start',
        required: true,
        label: 'Fecha de Inicio',
        key: 'date_start',
        enabled: true,
        functionality: 'A',
        type: 'date',
        placeholder: 'Ingresa la fecha de inicio',
        formControlName: 'date_start',
        validators: [
          { type: 'required', value: true, message: 'La Fecha de Inicio es obligatoria' }
        ]
      },
      {
        requestId: 'date_end',
        required: true,
        label: 'Fecha de Fin',
        key: 'date_end',
        enabled: true,
        functionality: 'A',
        type: 'date',
        placeholder: 'Ingresa la fecha de fin',
        formControlName: 'date_end',
        validators: [
          { type: 'required', value: true, message: 'La Fecha de Fin es obligatoria' }
        ]
      },
      {
        requestId: 'days_week',
        required: true,
        label: 'Selecciona los dias de la semana',
        key: 'days_week',
        enabled: true,
        functionality: 'A',
        type: 'checkbox',
        formControlName: 'days_week',
        options: [
          { label: 'Lunes', value: '1' },
          { label: 'Martes', value: '2' },
          { label: 'Miercoles', value: '3' },
          { label: 'Jueves', value: '4' },
          { label: 'Viernes', value: '5' },
          { label: 'Sábado', value: '6' },
          { label: 'Domingo', value: '0' },
        ],
        validators: []
      }
    ]
  },
  informationMessage: {
    title: 'Información',
    subtitle: 'Complete todos los campos para agregar un descuento'
  },
  errorMessage: ''
};
