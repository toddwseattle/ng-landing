import { Injectable } from '@angular/core';
import { Activity, IActivity, ACTIVETYPE, InvestmentActivity, ClassActivity  } from './activity';
import { divergentinvestments } from './activity-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/concat';


import { Thenable } from 'firebase';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class ActServiceService {
  public $investments: FirebaseListObservable<InvestmentActivity[]>;
  public $classes: FirebaseListObservable<ClassActivity[]>;

  constructor(public db: AngularFireDatabase) {
    this.$investments = db.list(this.activepath(ACTIVETYPE.Investment));
    this.$classes = db.list(this.activepath(ACTIVETYPE.Class));

   }

  private activepath(a: ACTIVETYPE): string {
    if (a === ACTIVETYPE.Investment) {
      return('/investments');
    } else {
      return ('/' + a.toLowerCase());
    }
}

  public getactivities(activities?: ACTIVETYPE[]): Observable<Activity[]> {
    if ( activities == null ) {
      // return this.$investments.zip(this.$classes);
      // let joined : Observable<Activity[]> = new FirebaseListObservable<Activity[]>;
      //const $joined = this.$investments.concat(this.$classes);
      return Observable.zip(this.$classes, this.$investments).map( (c: [Activity[]]) =>  (c[0].concat(c[1])));
    } else if (activities.indexOf(ACTIVETYPE.Investment) >= 0) {
      return this.$investments;
    }
  }


  public createClass(cls: ClassActivity): Thenable<any> {
    return(this.db.list(this.activepath(ACTIVETYPE.Class)).push(cls) );

    }

  public getClass(key: string) {
    return this.db.object(this.activepath(ACTIVETYPE.Class) + '/' + key);
  }
 }
