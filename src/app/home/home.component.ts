import { Component, OnInit } from '@angular/core';
import { ACTIVETYPE, allActivities } from '../core/activity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public curact = allActivities;
  activeclass= ACTIVETYPE.Class;
  constructor() { }

  ngOnInit() {
  }

}
