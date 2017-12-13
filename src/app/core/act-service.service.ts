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
import * as firebase from 'firebase';
// import 'firebase';
// import 'firebase/storage';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';

type activityarray = { [a in ACTIVETYPE] : Observable<IActivity[]> };
@Injectable()
export class ActServiceService {
  public $activityLists: activityarray= {Angel: null, DevProject: null, NonProfit: null, Investment: null, Class: null, Presentation: null};
  public $investments: Observable<InvestmentActivity[]>;
  public $classes: Observable<ClassActivity[]>;

  constructor(public db: AngularFireDatabase, public fbApp: FirebaseApp) {

  //  this.$activityLists[ACTIVETYPE.Angel] = db.list(this.activepath(ACTIVETYPE.Angel),  { query: ref => ref.orderByChild('name') });
    allActivities.forEach( act => {
      this.$activityLists[act] = db.list<IActivity>(this.activepath(act), ref => ref.orderByChild('name')).valueChanges();
    });
    this.$investments = db.list<InvestmentActivity>(this.activepath(ACTIVETYPE.Investment)).valueChanges();
    this.$classes = db.list<ClassActivity>(this.activepath(ACTIVETYPE.Class)).valueChanges();

   }

  public activepath(a: ACTIVETYPE): string {
    if (a === ACTIVETYPE.Investment) {
      return('/investments');
    } else {
      return ('/' + a.toLowerCase());
    }
}

  public getactivities(activities?: ACTIVETYPE[]): Observable<IActivity[]> {
    const retrievelists: Observable<IActivity[]>[] = [];
    if ( activities == null ) {
      activities = allActivities;
    }
    activities.forEach((a: ACTIVETYPE) => {
      retrievelists.push(this.$activityLists[a]);
    });
      return Observable.zip(...retrievelists)
                 .map( (x) => {
                   const y = [].concat.apply([], x);
                  return y; });
       }
  private fixActivity(tofix: IActivity, key: string): IActivity {
    const fixed = tofix;
    if (!fixed.hidden) {
      fixed.hidden = false;
    }
    if (!tofix.key) {
      if (key) {
        fixed.key = key;
      } else if (fixed.$key) {
        fixed.key = fixed.$key;
      } else {
        console.log('key is undefined on firebase retrieval');
      }
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
    return(this.db.object<IActivity>(this.activepath(qa) + '/' + key).valueChanges()
          .switchMap(activity => Observable.of(this.fixActivity(activity, key))));
    } else {
      console.log('getActivitybyKey invalid params activity:%s key:%s', qa, key);
      return(Observable.empty<IActivity>());
    }
  }

  public getActivefromName(active: ACTIVETYPE, name: string): Observable<IActivity> {
    if (active && name) {
      return (
        this.db.list(this.activepath(active),  ref => ref.orderByChild('name').equalTo(name)).valueChanges()
          .switchMap(list => Observable.of(list[0]) as Observable<IActivity>)
      );
    } else {
      return( Observable.of(null));
    }
  }

  public uploadImagefile(f: File): firebase.storage.UploadTask    {
    const rootRef = this.fbApp.storage().ref();
    const filepath = '/images/' + f.name;
    const imageRef = rootRef.child(filepath);
    return(imageRef.put(f));
  }

  public updateActivity(a: IActivity): Promise<void> {
    const actpath = this.activepath(a.activetype) + '/' + a.key;
    delete a['$key'];
    const actobj = this.db.object(actpath);
    return(actobj.update(a));
  }
  public createActivity(a: IActivity): firebase.database.ThenableReference {
    return(this.db.list(this.activepath(a.activetype)).push(a));
  }
 }
