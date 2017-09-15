import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActServiceService } from '../common/act-service.service';
import { IActivity, Activity, ACTIVETYPE } from '../common/activity';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activities$: Observable<IActivity[]>;
  deletelist: string[]= [];
  constructor(public as: ActServiceService, public router: Router) {
    this.activities$ = as.getactivities();
    this.activities$.subscribe(x => {
      console.log(x);
    });
  }

  ngOnInit() {
  }

  addActivity() {
    this.router.navigate(['activity']);
  }
  applyChange() {}
  deleteCheck(id: string) {
    const index = this.deletelist.indexOf(id);
    if (index > -1) {
      // undelete it
      this.deletelist.splice(index, 1);
    } else {
      this.deletelist.push(id);
    }
  }
 activityClick(a: IActivity) {
    console.log(a.name + ': ' + a.activetype);
   // this.as.getActivitybyName(a.activetype, a.name).subscribe(key => console.log(key));
  }
}
