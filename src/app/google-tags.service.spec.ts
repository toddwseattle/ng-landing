import { TestBed, inject } from '@angular/core/testing';

import { GoogleTagsService } from './google-tags.service';

describe('GoogleTagsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleTagsService]
    });
  });

  it('should be created', inject([GoogleTagsService], (service: GoogleTagsService) => {
    expect(service).toBeTruthy();
  }));
});
