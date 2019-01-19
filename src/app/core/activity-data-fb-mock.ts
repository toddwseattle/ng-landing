import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { PathReference } from "@angular/fire/database";
import { divergentinvestments } from "./activity-data";
import { Activity, ACTIVETYPE } from "./activity";
import { Observable } from "rxjs";

export const investmentsobs = (observer: any) => {
  observer.next(divergentinvestments);
};

export const AngularFireDatabaseMock = {
  // list(pathOrRef: PathReference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<any[]>;
  list: function(pathOrRef: PathReference): Observable<any[]> {
    switch (pathOrRef) {
      case "/investments":
        return Observable.create(investmentsobs) as Observable<Activity[]>;
      default:
        break;
    }
  }
};
