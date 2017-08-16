import { Component, OnInit, ElementRef } from '@angular/core';
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
  cols = 3;
  items: ICard[]= [];
  actvites: IActivity[];
  constructor(public el: ElementRef) {
    this.actvites = divergentinvestments;
    this.actvites.forEach(activity => {
       this.items.push({header: activity.name,
                        body: activity.description,
                        image: activity.image,
                        footer: activity.organization.Url.toString()});
    }); // forEach activity
  }

  ngOnInit() {
    this.cols =this.sizeCols(this.el.nativeElement.offsetWdith);
  }
  sizeCols(width) {
    return( Math.floor(width / 300) >= 1 ? Math.floor(width / 300) : 1);
  }
  onResize(event) {
    const element = event.target.innerWidth;
    console.log(element);
    this.cols = this.sizeCols(element);
    console.log('columngs %s', this.cols);
  }

}
