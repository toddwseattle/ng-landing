import { Injectable } from '@angular/core';
import { Activity, IActivity, ACTIVETYPE, InvestmentActivity  } from './activity';
import { divergentinvestments } from './activity-data';
import { Observable } from 'rxjs/observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ActServiceService {
  public investments: FirebaseListObservable<InvestmentActivity[]>;

  constructor(public db: AngularFireDatabase) {
    this.investments = db.list('/investments');
   }

  public getactivities(activities?: ACTIVETYPE[]): FirebaseListObservable<Activity[]> {
    if ( activities == null ) {
      return this.investments;
    } else if (activities.indexOf(ACTIVETYPE.Investment) >= 0) {
      return this.investments;
    }
  }
}
