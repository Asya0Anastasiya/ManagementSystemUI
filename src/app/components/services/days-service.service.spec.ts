import { TestBed } from '@angular/core/testing';

import { DaysServiceService } from './days-service.service';

describe('DaysServiceService', () => {
  let service: DaysServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
