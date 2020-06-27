import { TestBed } from '@angular/core/testing';

import { PriceBookService } from './price-book.service';

describe('PriceBookService', () => {
  let service: PriceBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
