import { Component, OnInit } from '@angular/core';
import { ActServiceService } from '../common/act-service.service';
import { Activity, ACTIVETYPE } from '../common/activity';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activities$: FirebaseListObservable<Activity[]>;
  constructor(public as: ActServiceService) {
    this.activities$ = as.getactivities();
  }

  ngOnInit() {
  }

  addActivity() {}

}
