import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupermarketComponent } from './create-supermarket.component';

describe('CreateSupermarketComponent', () => {
  let component: CreateSupermarketComponent;
  let fixture: ComponentFixture<CreateSupermarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSupermarketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSupermarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
