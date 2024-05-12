import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCartComponent } from './register-cart.component';

describe('RegisterCartComponent', () => {
  let component: RegisterCartComponent;
  let fixture: ComponentFixture<RegisterCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
