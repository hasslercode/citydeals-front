export interface FormDataFormat {
  header: Header;
  contents: Contents;
  informationMessage: InformationMessage;
  errorMessage: string;
}

interface Header {
  title: string;
  subtitle: string;
}

interface Contents {
  buttonsText: ButtonsText;
  formElements: FormElement[];
}

interface ButtonsText {
  searchButton: string;
  cancelButton: string;
}

interface FormElement {
  requestId: string;
  required: boolean;
  label: string;
  placeholder?: string;
  key: string;
  enabled: boolean;
  functionality: string;
  type: string;
  formControlName: string;
  options?: Option[] | undefined;
  validators: Validator[];
  maxLength?: number;
}

interface Option {
  label: string;
  value?: string | number;
  key?: string;
  validators?: Validator[]
}

interface Validator {
  type: string;
  value: boolean | string | number;
  message: string;
}

interface InformationMessage {
  title: string;
  subtitle: string;
  subtitle_error?: string;
  btnTextModal?: string;
}
