import { Component, OnInit } from '@angular/core';
import { IActivity, Activity, InvestmentActivity, IImage } from '../common/activity';
import { divergentinvestments } from '../common/activity-data';

interface ICard {
    header: string;
    body: string;
    image: IImage ;
    footer: string;
  }




@Component({
  selector: 'app-activity-grid',
  templateUrl: './activity-grid.component.html',
  styleUrls: ['./activity-grid.component.css']
})

export class ActivityGridComponent implements OnInit {

  items: ICard[]= [];
  actvites: IActivity[];
  constructor() {
    this.actvites = divergentinvestments;
    this.actvites.forEach(activity => {
       this.items.push({header: activity.name,
                        body: activity.description,
                        image: activity.image,
                        footer: activity.organization.Url.toString()});
    }); // forEach activity
  }

  ngOnInit() {
  }

}
