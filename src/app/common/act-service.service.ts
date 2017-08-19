import { Injectable } from '@angular/core';
import { Activity, IActivity, ACTIVETYPE  } from './activity';
import { divergentinvestments } from './activity-data';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ActServiceService {

  constructor() { }

  public getactivities(activities?: ACTIVETYPE[]): Observable<Activity[]> {
    if ( activities == null ) {
      return Observable.create(obs => {
        obs.next(divergentinvestments);
        obs.complete();
      });
    } else if (activities.indexOf(ACTIVETYPE.Investment) >= 0) {
      return Observable.create(obs => {
        obs.next(divergentinvestments);
        obs.complete();
      });
    }
  }
}
