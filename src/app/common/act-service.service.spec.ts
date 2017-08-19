import { TestBed, inject } from '@angular/core/testing';

import { ActServiceService } from './act-service.service';
import { ACTIVETYPE, Activity } from './activity';
import { Observable } from 'rxjs/observable';

describe('ActServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActServiceService]
    });
  });

  it('should be created', inject([ActServiceService], (service: ActServiceService) => {
    expect(service).toBeTruthy();
  }));
  it('should have a getactivities method', inject([ActServiceService], (service: ActServiceService) => {
    expect(service.getactivities).toBeTruthy();
  }));
   it('getactivities should return activities without parameters', inject([ActServiceService], (service: ActServiceService, done) => {
    const actobs = service.getactivities();
    actobs.subscribe((actives) => {
      expect(actives.length).toBeGreaterThan(0);
    });
  }));
  it('getactivities([ACTIVETYPE.Invesment]) should return one or more investment activities',
    inject([ActServiceService], (service: ActServiceService, done) => {
      const actobs = service.getactivities([ACTIVETYPE.Investment]);
      actobs.subscribe((actives) => {
        expect(actives.length).toBeGreaterThan(0);
        expect(actives.every(v => (v.activetype === ACTIVETYPE.Investment)));
      });
  }));
});
