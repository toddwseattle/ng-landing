import { Injectable } from '@angular/core';
import { Activity, IActivity, ACTIVETYPE, InvestmentActivity, ClassActivity  } from './activity';
import { divergentinvestments } from './activity-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
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

  public activepath(a: ACTIVETYPE): string {
    if (a === ACTIVETYPE.Investment) {
      return('/investments');
    } else {
      return ('/' + a.toLowerCase());
    }
}

  public getactivities(activities?: ACTIVETYPE[]): Observable<IActivity[]> {
    if ( activities == null ) {
      return Observable.zip(this.$classes, this.$investments).map( (c: [IActivity[]]) =>  (c[0].concat(c[1])));
    } else if (activities.indexOf(ACTIVETYPE.Investment) >= 0) {
      return this.$investments;
    }
  }
  public getActivitybyKey(qa: ACTIVETYPE, key: string): FirebaseObjectObservable<IActivity> {
    return(this.db.object(this.activepath(qa) + '/' + key));
  }
 /*  public getActivitybyName(qa: ACTIVETYPE, qname: string): FirebaseObjectObservable<IActivity> {
    const fbquery = {query: {orderByChild: 'name', equalTo: qname, limitToFirst: 1 }};
    return this.db.list(this.activepath(qa), fbquery).flatMap(
       (activ: IActivity[]) => {
           const getact = activ[0];
           return(this.db.object(acitvepath(getact) + '/' + getact.$ref));
        }
      });
  } */


  public createClass(cls: ClassActivity): Thenable<any> {
    return(this.db.list(this.activepath(ACTIVETYPE.Class)).push(cls) );

    }

  public getClass(key: string) {
    return this.db.object(this.activepath(ACTIVETYPE.Class) + '/' + key);
  }
 }
