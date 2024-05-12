import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFullInfoCardComponent } from './product-full-info-card.component';

describe('ProductFullInfoCardComponent', () => {
  let component: ProductFullInfoCardComponent;
  let fixture: ComponentFixture<ProductFullInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFullInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFullInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
