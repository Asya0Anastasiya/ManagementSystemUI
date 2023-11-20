import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DaysService } from './days-service.service';

describe('DaysServiceService', () => {
  let service: DaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(DaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
