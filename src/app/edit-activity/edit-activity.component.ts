import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActServiceService } from '../core/act-service.service';
import { IActivity, Activity, ACTIVETYPE } from '../core/activity';
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
}
