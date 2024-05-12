import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermarketCardComponent } from './supermarket-card.component';

describe('SupermarketCardComponent', () => {
  let component: SupermarketCardComponent;
  let fixture: ComponentFixture<SupermarketCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupermarketCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupermarketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
