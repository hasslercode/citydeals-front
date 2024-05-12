import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormDataFormat } from '../../interfaces/custom-form';
import { Validator } from '../../helpers/validator.helper';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formData: FormDataFormat = {
    header: { title: '', subtitle: '' },
    contents: {
      buttonsText: { searchButton: '', cancelButton: '' },
      formElements: [],
    },
    informationMessage: { title: '', subtitle: '' },
    errorMessage: '',
  };
  @Input() routerPathLink: string = '/home';
  @Output() submitted = new EventEmitter<any>();
  @Output() formValuesChanged = new EventEmitter<any>();
  @Output() selectChange = new EventEmitter<{ id: string, value: any}>(); // EventEmitter para cambios en los selects

  customForm: FormGroup = new FormGroup({});
  headerData = this.formData.header;
  formElements = this.formData.contents.formElements;
  buttonsText = this.formData.contents.buttonsText;
  errorMessage = this.formData.errorMessage;
Regresar: any;

  constructor(private _formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.setFormData(this.formData);
  }

  setFormData(formData: any){
    this.formData = formData;
    this.headerData = this.formData.header;
    this.formElements = this.formData.contents.formElements;
    this.buttonsText = this.formData.contents.buttonsText;
    this.errorMessage = this.formData.errorMessage;
    this.createForm(this.formElements);
    this.setControlValidators();
    this.customForm.valueChanges.subscribe((values) => {
      this.formValuesChanged.emit(values);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData']) {
      this.setFormData(changes['formData'].currentValue);
    }
  }
  submitForm() {
    if (this.customForm.valid && this.customForm.value) {
      const formValueToSend: any = {};
      for (const field of this.formElements) {
        if (field.type === 'checkbox') {
          formValueToSend[field.formControlName] = this.getSelectedCheckboxOptions(field.formControlName);
        } else {
          formValueToSend[field.formControlName] = this.customForm.value[field.formControlName];
        }
      }
      this.submitted.emit(formValueToSend);
    }
  }
  onSelectChange(selectId: string) {
    const selectedValue = this.customForm.value[selectId];
    this.selectChange.emit({ id: selectId, value: selectedValue });
  }

  onCheckBoxChange(field: any) {
    if (field.type === 'checkbox') {
      const control = this.customForm.get(field.formControlName);
      if (control) {
        let selectedOptions = control.value || [];
        if (selectedOptions.includes(field.value)) {
          selectedOptions = selectedOptions.filter((value: any) => value !== field.value);
        } else {
          selectedOptions.push(field.value);
        }
        control.setValue(selectedOptions);
      }
    }
  }

  getSelectedCheckboxOptions(field: any): any[] {
    return this.customForm.value[field.formControlName] || [];
  }
  getErrorMessage(field: any): string {
    const control = this.customForm.get(field.formControlName);
    const touched = control!.touched;

    if (touched) {
      for (const validator of field.validators) {
        const validatorType = validator.type;
        if (control!.hasError(validatorType)) {
          return validator.message;
        }
      }
    }

    return '';
  }

  // En tu componente de Angular
  getDynamicClass(fieldType: string, formElementsLength: number): string {
    let colsClass: string;
    if (fieldType === 'textarea') {
      colsClass = 'col-lg-12 col-md-12 ';
    } else if (fieldType === 'checkbox') {
      colsClass = 'col-lg-12 col-md-12';
    } else {
      switch (formElementsLength) {
        case 2:
          colsClass = 'col-lg-6 col-md-6 col-sm-12';
          break;
        case 3:
          colsClass = 'col-lg-4 col-md-6 col-sm-12';
          break;
        case 4:
          colsClass = 'col-lg-3 col-md-6 col-sm-12';
          break;
        default:
          colsClass = 'col-lg-4 col-md-4 col-sm-12';
          break;
      }
    }
    return colsClass;
  }


  createForm(formElements: any[]): void {
    const formControlsConfig: { [key: string]: any } = {};
    formElements.forEach((formElement) => {
      if (formElement.enabled) {
        formControlsConfig[formElement.formControlName] = [
          '',
          Validators.required,
        ];
      }
    });
    this.customForm = this._formBuilder.group(formControlsConfig);
  }

  private setControlValidators() {
    this.formElements.forEach((formElement: any) => {
      if (formElement.enabled) {
        const control = this.customForm.get(formElement.formControlName);
        this.applyValidators(control, formElement.validators);
      }
    });
  }

  private applyValidators(control: AbstractControl | null, validators: any[]) {
    if (control) {
      const controlValidators: ValidatorFn[] = validators.map(
        (constrain: any) => Validator.create(constrain.type, constrain.value)
      );
      control.setValidators(controlValidators);
      control.updateValueAndValidity();
    }
  }
}
