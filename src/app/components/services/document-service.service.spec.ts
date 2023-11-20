import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DocumentServiceService } from './document-service.service';

describe('DocumentServiceService', () => {
  let service: DocumentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(DocumentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
