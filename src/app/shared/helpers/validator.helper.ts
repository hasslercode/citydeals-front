import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

export class Validator extends Validators {
  private static _email                   = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  private static _number                  = new RegExp(/^[0-9]+$/);
  private static _alphabet                = new RegExp(/^[ a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/);
  private static _alphanumeric            = new RegExp(/^[ a-zA-Z0-9áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/);
  private static _alphanumericWithSymbols = new RegExp(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/);
  private static _url                     = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);


  public static check_email(email: AbstractControl) {
    if (email.pristine) {
      return null;
    }

    email.markAsTouched();

    if (Validator._email.test(email.value) || email.value === '') {
      return null;
    }

    return {
      invalidEmail: true
    };
  }

  public static number(num: AbstractControl) {
    if (num.pristine) {
      return null;
    }

    num.markAsTouched();

    if (Validator._number.test(num.value)) {
      return null;
    }

    return {
      invalidNumber: true
    };
  }

  public static alphabet(alphabet: AbstractControl) {
    if (alphabet.pristine) {
      return null;
    }

    alphabet.markAsTouched();

    if (Validator._alphabet.test(alphabet.value)  || alphabet.value === '') {
      return null;
    }

    return {
      invalidLetter: true
    };
  }

  public static alphanumeric(alphanumeric: AbstractControl) {
    if (alphanumeric.pristine) {
      return null;
    }

    alphanumeric.markAsTouched();

    if (Validator._alphanumeric.test(alphanumeric.value)) {
      return null;
    }

    return {
      invalidLetter: true
    };
  }

  public static address(address: AbstractControl) {
    if (address.pristine) {
      return null;
    }

    address.markAsTouched();

    if (Validator._alphanumericWithSymbols.test(address.value)) {
      return null;
    }

    return {
      invalidLetter: true
    };
  }

  public static url(url: AbstractControl) {
    if (url.pristine) {
      return null;
    }

    url.markAsTouched();

    if (Validator._url.test(url.value)) {
      return null;
    }

    return {
      invalidLetter: true
    };

  }

  public static validateRange(min: number, max: number): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
          return { 'validateRange': true };
      }
      return null;
    };
  }

  public static validateDisableField(FormCtrl: string): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.get(FormCtrl)?.disabled) {
          return { 'validateDisabledField': true };
      }
      return null;
    };
  }

  public static requireAtLeastOneField(minRequired = 1): ValidatorFn {
    return function validate(formGroup: AbstractControl): {[key: string]: any} | null {
      let checked = 0;
      let formKeys = Object.keys(formGroup.value);
      formKeys.forEach(key => {
        const control = formGroup.get(key);

        if (control && control.value !== '') {
          checked++;
        }
      });

      if (checked < minRequired) {
        return {
          requireAtLeastOneField: true,
        };
      }

      return null;
    };
  }

  public static create(validatorName: string, value: any): ValidatorFn {
    switch (validatorName.toLowerCase()) {
      case "required":
        return Validators.required;
      case "requiredtrue":
         return Validators.requiredTrue;
      case "minlength":
        return Validators.minLength(value);
      case "maxlength":
        return Validators.maxLength(value);
      case "pattern":
        return Validators.pattern(value);
      case "min":
        return Validators.min(value);
      case "max":
        return Validators.max(value);
      default:
        return Validators.nullValidator;
    }
  }
}

