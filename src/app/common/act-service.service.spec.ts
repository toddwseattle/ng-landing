import { TestBed, inject } from '@angular/core/testing';

import { ActServiceService } from './act-service.service';
import { ACTIVETYPE, Activity } from './activity';
import { Observable } from 'rxjs/observable';
import { AngularFireDatabaseMock } from './activity-data-fb-mock';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

describe('ActServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase, 'ng-landing'),
      //  AngularFireDatabaseModule
      ],
      providers: [ActServiceService,
                 // AngularFireDatabase
                 {provide: AngularFireDatabase, useValue: AngularFireDatabaseMock}
                ]
    });
  });

  it('should be created', inject([ActServiceService], (service: ActServiceService) => {
    expect(service).toBeTruthy();
  }));
  it('should have a getactivities method', inject([ActServiceService], (service: ActServiceService) => {
    expect(service.getactivities).toBeTruthy();
  }));
   it('getactivities, should return activities without parameters', inject([ActServiceService], (service: ActServiceService, done) => {
    const actobs = service.getactivities();
    actobs.subscribe((actives) => {
      expect(actives.length).toBeGreaterThan(0);
    });
  }));
  it('getactivities([ACTIVETYPE.Investment]) should return one or more investment activities',
    inject([ActServiceService], (service: ActServiceService, done) => {
      const actobs = service.getactivities([ACTIVETYPE.Investment]);
      actobs.subscribe((actives) => {
        expect(actives.length).toBeGreaterThan(0);
        expect(actives.every(v => (v.activetype === ACTIVETYPE.Investment)));
      });
  }));
});
