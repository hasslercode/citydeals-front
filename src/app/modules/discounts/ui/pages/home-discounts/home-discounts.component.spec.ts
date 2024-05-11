import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscountsComponent } from './home-discounts.component';

describe('HomeDiscountsComponent', () => {
  let component: HomeDiscountsComponent;
  let fixture: ComponentFixture<HomeDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
