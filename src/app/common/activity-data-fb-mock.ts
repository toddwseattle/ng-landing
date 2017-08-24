import { AngularFireDatabase,  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { PathReference, FirebaseListFactoryOpts } from 'angularfire2/database/interfaces';
import { divergentinvestments } from './activity-data';
import { Activity, ACTIVETYPE } from './activity';
import { Observable } from 'rxjs/Observable';

const investmentsobs = (observer: any) => {
    observer.next(divergentinvestments);
};

export class AngularFireDatabaseMock extends AngularFireDatabase {
    // list(pathOrRef: PathReference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<any[]>;
    public list(pathOrRef: PathReference, opts?: FirebaseListFactoryOpts): FirebaseListObservable<any[]> {
        switch (pathOrRef) {
            case '/investments':
                return(Observable.create(investmentsobs) as FirebaseListObservable<Activity[]>);
            default:
                break;
        }
    }
}
