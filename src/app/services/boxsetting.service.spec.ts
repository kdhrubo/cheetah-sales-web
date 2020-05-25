import { TestBed } from '@angular/core/testing';

import { BoxsettingService } from './boxsetting.service';

describe('BoxsettingService', () => {
  let service: BoxsettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxsettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
