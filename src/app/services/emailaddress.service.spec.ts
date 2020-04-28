import { TestBed } from '@angular/core/testing';

import { EmailaddressService } from './emailaddress.service';

describe('EmailaddressService', () => {
  let service: EmailaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
