import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IActivity, Activity, PresentationActivity, ACTIVETYPE, InvestmentActivity, IImage } from '../core/activity';
import { ActServiceService } from '../core/act-service.service';
interface ICard {
    header: string;
    body: string;
    image: IImage ;
    footer: string;
    act: ACTIVETYPE;
  }




@Component({
  selector: 'app-activity-grid',
  templateUrl: './activity-grid.component.html',
  styleUrls: ['./activity-grid.component.css']
})

export class ActivityGridComponent implements OnInit, OnDestroy {
  @Input() activityType: ACTIVETYPE[];
  @Input() current = false;
  @Input() divergent = false;
  cols = 3;
  items: ICard[] = [];
  private acts$: Subscription;
  private media$: Subscription;
  constructor(public el: ElementRef, public as: ActServiceService, public media: ObservableMedia, public route: Router) {

  }

  private setmediachange() {
    const COLUMNS = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4, 'xl': 4 };
    this.media$ = this.media.subscribe((change: MediaChange) => {
      this.cols = COLUMNS[change.mqAlias];
    });
  }

  ngOnInit() {
  // refactor refactor to make ICard's an observable and use | async?
  this.setmediachange();
  this.acts$ = this.as.getactivities(this.activityType).subscribe(acts => {
      acts.forEach(activity => {
       if ((this.current && !(activity.dateEnd > 0)) || !this.current) {
       if (activity.activetype === ACTIVETYPE.Presentation) {
         const prezo = activity as PresentationActivity;
         this.items.push({header: prezo.name,
          body: prezo.description,
          image: prezo.image,
          footer: prezo.presentation.Url.toString(),
         act: activity.activetype });
       } else {
        if (!this.divergent) {
        this.items.push({header: activity.name,
          body: activity.description,
          image: activity.image,
          footer: activity.organization.Url.toString(),
          act: activity.activetype
        });
        } else {
          if (activity.activetype === ACTIVETYPE.Investment) {
            const invest = activity as InvestmentActivity;
            if (invest.vehicle === 'Divergent') {
              this.items.push({header: activity.name,
                body: activity.description,
                image: activity.image,
                footer: activity.organization.Url.toString(),
                act: activity.activetype
              });
            }
          }
        }
        }
      }
      }); // forEach activity

    });
   // this.cols = this.sizeCols(this.el.nativeElement.offsetWdith);
  }
  sizeCols(width) {
    return( Math.floor(width / 300) >= 1 ? Math.floor(width / 300) : 1);
  }

  showDetail(item: ICard) {
    this.route.navigateByUrl('activity/' + item.act + '/' + item.header);
  }
  ngOnDestroy() {
    this.acts$.unsubscribe();
    this.media$.unsubscribe();
  }

}
