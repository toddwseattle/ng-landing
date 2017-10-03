import { Injectable } from '@angular/core';
import { Activity, IActivity, ACTIVETYPE, allActivities, InvestmentActivity, ClassActivity  } from './activity';
import { divergentinvestments } from './activity-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';


import { Thenable } from 'firebase';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

type activityarray = { [a in ACTIVETYPE] : FirebaseListObservable<IActivity[]> };
@Injectable()
export class ActServiceService {
  public $activityLists: activityarray= {Angel: null, DevProject: null, NonProfit: null, Investment: null, Class: null, Presentation: null};
  public $investments: FirebaseListObservable<InvestmentActivity[]>;
  public $classes: FirebaseListObservable<ClassActivity[]>;

  constructor(public db: AngularFireDatabase) {
    allActivities.forEach(a => console.log(a));
    this.$activityLists[ACTIVETYPE.Angel] = db.list(this.activepath(ACTIVETYPE.Angel));
    allActivities.forEach( act => {
      this.$activityLists[act] = db.list(this.activepath(act));
    });
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
      activities = allActivities;
      return Observable.zip(this.$activityLists.Investment, this.$activityLists.Class,
                            this.$activityLists.DevProject)
                 .map( (x) => {
                   const y = [].concat.apply([], x);
                  return y; });
      // return Observable.zip(this.$classes, this.$investments).map( (c: [IActivity[]]) =>  (c[0].concat(c[1])));
    }
    // else if (activities.indexOf(ACTIVETYPE.Investment) >= 0) {
    //   return this.$investments;
    }
  private fixActivity(tofix: IActivity): IActivity {
    const fixed = tofix;
    if (!fixed.hidden) {
      fixed.hidden = false;
    }
    if (!fixed.dateStart) {
      fixed.dateStart = 0;
    }
    if (tofix.activetype.toString() === 'investment') {
      fixed.activetype = ACTIVETYPE.Investment;
    }
    return fixed;
  }
  public getActivitybyKey(qa: ACTIVETYPE, key: string): Observable<IActivity> {
    if (qa && key) {
    return(this.db.object(this.activepath(qa) + '/' + key).switchMap(activity => Observable.of(this.fixActivity(activity))));
    } else {
      console.log('getActivitybyKey invalid params activity:%s key:%s', qa, key);
      return(Observable.empty<IActivity>() as FirebaseObjectObservable<IActivity>);
    }
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


  public updateActivity(a: IActivity): Thenable<any> {
    return(this.db.object(this.activepath(a.activetype) + '/' + a.$key).set(a));
  }
  public createActivity(a: IActivity): Thenable<any> {
    return(this.db.list(this.activepath(a.activetype)).push(a));
  }
 }
