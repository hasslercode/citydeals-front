import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
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
  @Output() selectChange = new EventEmitter<{ id: string; value: any }>(); // EventEmitter para cambios en los selects

  customForm: FormGroup = new FormGroup({});
  headerData = this.formData.header;
  formElements = this.formData.contents.formElements;
  buttonsText = this.formData.contents.buttonsText;
  errorMessage = this.formData.errorMessage;
  Regresar: any;

  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.setFormData(this.formData);
  }

  setFormData(formData: any) {
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
    let canSubmit = true;
    if (this.customForm.valid && this.customForm.value) {
      const formValueToSend: any = {};
      for (const field of this.formElements) {
        if (field.type === 'checkbox') {
          const formGroup = this.customForm.get(field.formControlName) as FormGroup;
          const selectedValues: any = [];
          Object.keys(formGroup.controls).forEach((value) => {
            const control = formGroup.get(value);
            if (control && control.value) {
              selectedValues.push(value);
            }
          });
          selectedValues.length == 0 ? canSubmit = false: canSubmit = true;
          formValueToSend[field.formControlName] = selectedValues;
        } else {
          formValueToSend[field.formControlName] =
            this.customForm.value[field.formControlName];
        }
      }
      if(canSubmit){
        this.submitted.emit(formValueToSend);
      }
    }
  }

  onSelectChange(selectId: string) {
    const selectedValue = this.customForm.value[selectId];
    this.selectChange.emit({ id: selectId, value: selectedValue });
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
        if (formElement.type === 'checkbox') {
          const checkboxes: { [key: string]: any } = {};
          formElement.options.forEach((option: any) => {
            const formControlName = `${option.value}`;
            checkboxes[formControlName] = new FormControl(false); // Inicializar cada checkbox como falso
          });
          formControlsConfig[formElement.formControlName] = new FormGroup(
            checkboxes
          ); // Crear FormGroup para los checkboxes
        } else {
          formControlsConfig[formElement.formControlName] = [
            '',
            Validators.required,
          ];
        }
      }
    });
    this.customForm = this._formBuilder.group(formControlsConfig);
  }

  getFormControl(fieldControlName: string): FormGroup {
    const control = this.customForm.get(fieldControlName);
    if (control instanceof FormGroup) {
      return control;
    } else {
      return new FormGroup({});
    }
  }

  private setControlValidators() {
    this.formElements.forEach((formElement: any) => {
      if (formElement.enabled) {
        if (formElement.type === 'checkbox') {
          const formGroup = this.customForm.get(
            formElement.formControlName
          ) as FormGroup;
          Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);
            this.applyValidators(control, formElement.validators);
          });
        } else {
          const control = this.customForm.get(formElement.formControlName);
          this.applyValidators(control, formElement.validators);
        }
      }
    });
  }

  getSelectedCheckboxes(): any {
    const selectedValues: any = {};
    for (const field of this.formElements) {
      if (field.type === 'checkbox') {
        selectedValues[field.formControlName] = [];
        const formArray = this.customForm.get(
          field.formControlName
        ) as FormArray;
        formArray.controls.forEach((control, index) => {
          if (control.value) {
            selectedValues[field.formControlName].push(
              field.options![index].value
            );
          }
        });
      }
    }
    return selectedValues;
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
