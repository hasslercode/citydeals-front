import { FormControl, FormGroup } from '@angular/forms';
import { Validator } from './validator.helper';

describe('validator helper', () => {
  const control = new FormGroup({
    email: new FormControl(''),
    alphanumeric: new FormControl(''),
    number: new FormControl(''),
    address: new FormControl(''),
    alphabet: new FormControl(''),
    url: new FormControl('')
  });
  let controlValidete!: any;
  let validator!: any;
  let formControl = new FormControl();
  let formGroup = new FormGroup({
        myControl: formControl,
      });
  let validatorFn = Validator.validateDisableField('myControl');
  let validatorFnRange = Validator.validateRange(1, 10);

  beforeEach(() => {
    controlValidete = control;
    validator = Validator;

  });

  it('should be test email', () => {
    controlValidete.controls['email'].setValue('1234@gmail.com');
    controlValidete.controls['email'].markAsDirty();
    const result = validator.email(controlValidete.controls['email']);
    expect(result).toBeNull();
  });

  it('should be test number', () => {
    controlValidete.controls['number'].setValue(1234);
    controlValidete.controls['number'].markAsDirty();
    const result = validator.number(controlValidete.controls['number']);
    expect(result).toBeNull();
  });

  it('should be test number pristine', () => {
    controlValidete.controls['number'].setValue(1234);
    controlValidete.controls['number'].markAsPristine();
    const result = validator.number(controlValidete.controls['number']);
    expect(result).toBeNull();
  });

  it('should return null if alphabet control is pristine', () => {
    controlValidete.controls['alphabet'].markAsPristine();
    const result = validator.alphabet(controlValidete.controls['alphabet']);
    expect(result).toBeNull();
  });

  it('should be test number fail test', () => {
    controlValidete.controls['number'].setValue('ssssss');
    controlValidete.controls['number'].markAsDirty();
    const result = validator.number(controlValidete.controls['number']);
    expect(result).toEqual({ invalidNumber: true });
  });

  it('should be test alphanumeric test ', () => {
    controlValidete.controls['alphanumeric'].setValue('ssssssq111');
    controlValidete.controls['alphanumeric'].markAsDirty();
    const result = validator.alphanumeric(controlValidete.controls['alphanumeric']);
    expect(result).toBeNull();
  });

  it('should be test alphanumeric test pristine', () => {
    controlValidete.controls['alphanumeric'].setValue('ssssssq111');
    controlValidete.controls['alphanumeric'].markAsPristine();
    const result = validator.alphanumeric(controlValidete.controls['alphanumeric']);
    expect(result).toBeNull();
  });

  it('should be test alphanumeric test fail', () => {
    controlValidete.controls['alphanumeric'].setValue('@^+');
    controlValidete.controls['alphanumeric'].markAsDirty();
    const result = validator.alphanumeric(controlValidete.controls['alphanumeric']);
    expect(result).toEqual({ invalidLetter: true });
  });

  it('should be test alphabet test', () => {
    controlValidete.controls['alphabet'].setValue('ssssssq');
    controlValidete.controls['alphabet'].markAsDirty();
    const result = validator.alphabet(controlValidete.controls['alphabet']);
    expect(result).toBeNull();
  });

  it('should be test alphabet test fail', () => {
    controlValidete.controls['alphabet'].setValue('@^+');
    controlValidete.controls['alphabet'].markAsDirty();
    const result = validator.alphabet(controlValidete.controls['alphabet']);
    expect(result).toEqual({ invalidLetter: true });
  });

  it('should be test address test', () => {
    controlValidete.controls['address'].setValue('ssssssq');
    controlValidete.controls['address'].markAsDirty();
    const result = validator.address(controlValidete.controls['address']);
    expect(result).toBeNull();
  });

  it('should be test address test fail', () => {
    controlValidete.controls['address'].setValue('@^+');
    controlValidete.controls['address'].markAsDirty();
    const result = validator.address(controlValidete.controls['address']);
    expect(result).toEqual({ invalidLetter: true });
  });

  it('should return null test address', () => {
    controlValidete.controls['address'].markAsPristine();
    const result = validator.address(controlValidete.controls['address']);
    expect(result).toBeNull();
  });

  it('should create a standard validator', () => {
    let result = validator.create("required", true);
    expect(result).not.toBeNull();

    result = validator.create("requiredtrue", true);
    expect(result).not.toBeNull();

    result = validator.create("minlength", 4);
    expect(result).not.toBeNull();

    result = validator.create("maxlength", 50);
    expect(result).not.toBeNull();

    result = validator.create("pattern", "[a-zA-Z0-9]+");
    expect(result).not.toBeNull();

    result = validator.create("min", 10);
    expect(result).not.toBeNull();

    result = validator.create("max", 100);
    expect(result).not.toBeNull();

  });

  it('should return null if url control is pristine and value is not empty', () => {
    control.controls['url'].setValue('http://example.com');
    control.controls['url'].markAsPristine();
    const result = validator.url(control.controls['url']);
    expect(result).toBeNull();
  });

  it('should return null if url control is not pristine and value is valid', () => {
    control.controls['url'].setValue('http://example.com');
    control.controls['url'].markAsTouched();
    const result = validator.url(control.controls['url']);
    expect(result).toBeNull();
  });

  it('should return an error object if url control is not pristine and value is invalid', () => {
    control.controls['url'].setValue('invalid-url');
    control.controls['url'].markAsTouched();
    const result = validator.url(control.controls['url']);
    expect(result).toBeNull();
  });

  it('should return null if url control is pristine and value is empty', () => {
    control.controls['url'].setValue('');
    control.controls['url'].markAsPristine();
    const result = validator.url(control.controls['url']);
    expect(result).toBeNull();
  });

  it('should validate number', () => {
    control.controls['number'].setValue('123');
    control.controls['number'].markAsDirty();
    const result = validator.number(control.controls['number']);
    expect(result).toBeNull();
  });

  it('should validate alphanumeric', () => {
    control.controls['alphanumeric'].setValue('abcd123');
    control.controls['alphanumeric'].markAsDirty();
    const result = validator.alphanumeric(control.controls['alphanumeric']);
    expect(result).toBeNull();
  });

  it('should validate alphabet', () => {
    control.controls['alphabet'].setValue('abcd');
    control.controls['alphabet'].markAsDirty();
    const result = validator.alphabet(control.controls['alphabet']);
    expect(result).toBeNull();
  });

  it('should validate address', () => {
    control.controls['address'].setValue('123 Main St.');
    control.controls['address'].markAsDirty();
    const result = validator.address(control.controls['address']);
    expect(result).toBeNull();
  });

  it('should create a standard validator', () => {
    let result = validator.create("required", true);
    expect(result).not.toBeNull();

    result = validator.create("requiredtrue", true);
    expect(result).not.toBeNull();

    result = validator.create("minlength", 4);
    expect(result).not.toBeNull();

    result = validator.create("maxlength", 50);
    expect(result).not.toBeNull();

    result = validator.create("pattern", "[a-zA-Z0-9]+");
    expect(result).not.toBeNull();

    result = validator.create("min", 10);
    expect(result).not.toBeNull();

    result = validator.create("max", 100);
    expect(result).not.toBeNull();

    result = validator.create("", null);
    expect(result).not.toBeNull();
  });

  it('should return null if the control is not disabled', () => {
    expect(validatorFn(formGroup)).toBeNull();
  });

  it('should return an error object if the control is disabled', () => {
    formControl.disable();
    expect(validatorFn(formGroup)).toEqual({ validateDisabledField: true });
  });

  it('should return null if the control value is within the range', () => {
    formControl.setValue(5);
    expect(validatorFnRange(formControl)).toBeNull();
  });

  it('should return an error object if the control value is greater than the maximum', () => {
    formControl.setValue(15);
    expect(validatorFnRange(formControl)).toEqual({ validateRange: true });
  });

});

