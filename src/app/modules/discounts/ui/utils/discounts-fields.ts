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
        requestId: 'supermarket',
        required: true,
        label: 'Supermercado',
        key: 'supermarket',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'supermarket',
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
        requestId: 'product',
        required: true,
        label: 'Producto',
        key: 'product',
        enabled: true,
        functionality: 'A',
        type: 'select',
        formControlName: 'product',
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
        requestId: 'discount',
        required: true,
        label: 'Descuento',
        key: 'discount',
        enabled: true,
        functionality: 'A',
        placeholder: 'Ingresa el descuento',
        type: 'number',
        formControlName: 'discount',
        validators: [
          { type: 'required', value: true, message: 'El Descuento es obligatorio' }
        ]
      },
      {
        requestId: 'start_date',
        required: true,
        label: 'Fecha de Inicio',
        key: 'start_date',
        enabled: true,
        functionality: 'A',
        type: 'date',
        placeholder: 'Ingresa la fecha de inicio',
        formControlName: 'start_date',
        validators: [
          { type: 'required', value: true, message: 'La Fecha de Inicio es obligatoria' }
        ]
      },
      {
        requestId: 'end_date',
        required: true,
        label: 'Fecha de Fin',
        key: 'end_date',
        enabled: true,
        functionality: 'A',
        type: 'date',
        placeholder: 'Ingresa la fecha de fin',
        formControlName: 'end_date',
        validators: [
          { type: 'required', value: true, message: 'La Fecha de Fin es obligatoria' }
        ]
      },
      {
        requestId: 'days_of_week',
        required: true,
        label: 'Selecciona los dias de la semana',
        key: 'days_of_week',
        enabled: true,
        functionality: 'A',
        type: 'checkbox',
        formControlName: 'days_of_week',
        options: [
          { label: 'Lunes', value: '1' },
          { label: 'Martes', value: '2' },
          { label: 'Miercoles', value: '3' },
          { label: 'Jueves', value: '4' },
          { label: 'Viernes', value: '5' },
          { label: 'Sábado', value: '6' },
          { label: 'Domingo', value: '7' },
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
