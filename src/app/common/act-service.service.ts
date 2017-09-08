import { Injectable } from '@angular/core';
import { Activity, IActivity, ACTIVETYPE, InvestmentActivity, ClassActivity  } from './activity';
import { divergentinvestments } from './activity-data';
import { Observable } from 'rxjs/observable';
import { Thenable } from 'firebase';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class ActServiceService {
  public investments: FirebaseListObservable<InvestmentActivity[]>;

  constructor(public db: AngularFireDatabase) {
    this.investments = db.list(this.activepath(ACTIVETYPE.Investment));
   }

  private activepath(a: ACTIVETYPE): string {
    if (a === ACTIVETYPE.Investment) {
      return('/investments');
    } else {
      return ('/' + a.toLowerCase());
    }
}

  public getactivities(activities?: ACTIVETYPE[]): FirebaseListObservable<Activity[]> {
    if ( activities == null ) {
      return this.investments;
    } else if (activities.indexOf(ACTIVETYPE.Investment) >= 0) {
      return this.investments;
    }
  }


  public createClass(cls: ClassActivity): Thenable<any> {
    return(this.db.list(this.activepath(ACTIVETYPE.Class)).push(cls) );

    }

  public getClass(key: string) {
    return this.db.object(this.activepath(ACTIVETYPE.Class) + '/' + key);
  }
 }
