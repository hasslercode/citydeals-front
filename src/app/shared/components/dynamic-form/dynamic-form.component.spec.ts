import { DynamicFormComponent } from './dynamic-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { INTERVIEW_FORM_FIELDS } from '../../../features/interviews/ui/utils/interview-fields';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should emit form values when the form is valid', () => {
    const submittedSpy = jest.spyOn(component.submitted, 'emit');

    // Simula valores en el formulario
    component.customForm = formBuilder.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['johndoe@example.com', [Validators.required, Validators.email]],
    });

    component.submitForm();

    // Verifica si el evento 'submitted' se emitió con los valores correctos
    expect(submittedSpy).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    });
  });

  it('should not emit form values when the form is invalid', () => {
    component.customForm = formBuilder.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['johndoe@example.com', [Validators.required, Validators.email]],
    });
    const submittedSpy = jest.spyOn(component.submitted, 'emit');
    component.customForm.reset();
    component.submitForm();
    expect(submittedSpy).not.toHaveBeenCalled();
  });

  it('should emit selectChange event with correct id and value when onSelectChange is called', () => {

    component.customForm = formBuilder.group({
      testId: ['testValue', Validators.required]
    });

    const selectId = 'testId';
    const selectedValue = 'testValue';
    const expectedEvent = { id: selectId, value: selectedValue };

    const emitSpy = jest.spyOn(component.selectChange, 'emit');

    component.customForm.setValue({ [selectId]: selectedValue });
    component.onSelectChange(selectId);

    expect(emitSpy).toHaveBeenCalledWith(expectedEvent);
  });

  it('should return empty string when control is not touched in getErrorMessage', () => {

    component.customForm = formBuilder.group({
      testControl: ['testValue', Validators.required]
    });

    const field = { formControlName: 'testControl', validators: [] };
    const control = component.customForm.get(field.formControlName);
    const expectedErrorMessage = '';

    const result = component.getErrorMessage(field);

    expect(result).toBe(expectedErrorMessage);
  });

  it('should return correct class based on fieldType and formElementsLength in getDynamicClass', () => {
    const fieldType = 'input';
    const formElementsLength = 2;
    const expectedClass = 'col-lg col-md-12';

    const result = component.getDynamicClass(fieldType, formElementsLength);

    expect(result).toBe(expectedClass);
  });

  it('should set the formData property to the passed formData parameter', () => {
    const formData = INTERVIEW_FORM_FIELDS;
    component.setFormData(formData);
    expect(component.formData).toEqual(formData);
  });


});
