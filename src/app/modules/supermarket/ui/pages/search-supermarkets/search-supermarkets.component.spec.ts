import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupermarketsComponent } from './search-supermarkets.component';

describe('SearchSupermarketsComponent', () => {
  let component: SearchSupermarketsComponent;
  let fixture: ComponentFixture<SearchSupermarketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSupermarketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSupermarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
