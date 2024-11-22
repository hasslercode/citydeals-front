import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindfulBitesComponent } from './mindful-bites.component';

describe('MindfulBitesComponent', () => {
  let component: MindfulBitesComponent;
  let fixture: ComponentFixture<MindfulBitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindfulBitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindfulBitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
