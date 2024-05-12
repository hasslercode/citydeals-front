import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSupermarketsComponent } from './show-supermarkets.component';

describe('ShowSupermarketsComponent', () => {
  let component: ShowSupermarketsComponent;
  let fixture: ComponentFixture<ShowSupermarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSupermarketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSupermarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
