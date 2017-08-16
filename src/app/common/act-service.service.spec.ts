import { TestBed, inject } from '@angular/core/testing';

import { ActServiceService } from './act-service.service';

describe('ActServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActServiceService]
    });
  });

  it('should be created', inject([ActServiceService], (service: ActServiceService) => {
    expect(service).toBeTruthy();
  }));
});
