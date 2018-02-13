import { Component, OnInit } from '@angular/core';
import { ACTIVETYPE } from '../core/activity';
@Component({
  selector: 'app-divergent',
  templateUrl: './divergent.component.html',
  styleUrls: ['./divergent.component.css']
})
export class DivergentComponent implements OnInit {
  invest = [ACTIVETYPE.Investment];
  constructor() { }

  ngOnInit() {
  }

}
