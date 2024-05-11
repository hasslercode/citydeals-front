import { FormDataFormat } from "../../../../shared/interfaces/custom-form";

export const PRODUCT_FORM_FIELDS: FormDataFormat = {
  header: {
    title: 'Registro de Producto',
    subtitle: '',
  },
  contents: {
    buttonsText: {
      searchButton: 'Guardar',
      cancelButton: 'Cancelar',
    },
    formElements: [
      {
        requestId: 'field_id_1',
        required: true,
        label: 'Nombre del producto',
        placeholder: 'Ingresa el nombre del producto',
        key: 'product_name',
        enabled: true,
        functionality: '',
        type: 'text',
        formControlName: 'product_name',
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
        label: 'Categoría del producto',
        placeholder: 'Selecciona la categoría del producto',
        key: 'product_category',
        enabled: true,
        functionality: 'select',
        type: 'select',
        formControlName: 'product_category',
        options: [
          { label: 'Electrónica', value: 'electronics' },
          { label: 'Ropa', value: 'clothing' },
          { label: 'Hogar', value: 'home' },
        ],
        validators: [
          {
            type: 'required',
            value: true,
            message: 'Selecciona una categoría.',
          },
        ],
      },
      {
        requestId: 'field_id_3',
        required: true,
        label: 'Precio del producto',
        placeholder: 'Ingresa el precio del producto',
        key: 'product_price',
        enabled: true,
        functionality: '',
        type: 'number',
        formControlName: 'product_price',
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
        required: false,
        label: 'Descripción del producto',
        placeholder: 'Ingresa la descripción del producto',
        key: 'product_description',
        enabled: true,
        functionality: '',
        type: 'textarea',
        formControlName: 'product_description',
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
