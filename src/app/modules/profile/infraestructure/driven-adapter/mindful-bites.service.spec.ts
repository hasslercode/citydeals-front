import { TestBed } from '@angular/core/testing';

import { MindfulBitesService } from './mindful-bites.service';

describe('MindfulBitesService', () => {
  let service: MindfulBitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MindfulBitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
