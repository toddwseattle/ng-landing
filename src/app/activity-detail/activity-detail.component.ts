import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap, Params } from "@angular/router";
import { Observable, of } from "rxjs";
import {
  ACTIVETYPE,
  Activity,
  IActivity,
  allActivities,
  getTypefromString
} from "../core/activity";
import { ActServiceService } from "../core/act-service.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-activity-detail",
  templateUrl: "./activity-detail.component.html",
  styleUrls: ["./activity-detail.component.css"]
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  curtype = "";
  active: ACTIVETYPE;
  name = "";
  $currentActivity: Observable<IActivity>;

  constructor(public route: ActivatedRoute, public as: ActServiceService) {}

  ngOnInit() {
    this.$currentActivity = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("type")) {
          this.curtype = params.get("type");
          this.active = ACTIVETYPE[getTypefromString(params.get("type"))];
        }
        if (params.has("name")) {
          this.name = params.get("name");
        }
        if (this.name && this.active) {
          return this.as.getActivefromName(this.active, this.name);
        } else {
          return of(null);
        }
      })
    );
  }

  ngOnDestroy() {}
}
