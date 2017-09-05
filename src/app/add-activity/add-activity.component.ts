import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACTIVETYPE, allActivities } from '../common/activity';
@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  generalForm: FormGroup;
  allActivities = allActivities;


  constructor(private fb: FormBuilder, public router: Router) {
    this.createGeneralform();
   }
  createGeneralform() {
    this.generalForm = this.fb.group({
      type: [ACTIVETYPE.Investment, Validators.required],
      name: ['', Validators.required],
      hasend: [false, ],
      start: [(new Date(Date.now())).toISOString().slice(0, 10) , ] ,
      end: [(new Date(Date.now())).toISOString().slice(0, 10), ],
      description: ['', ],
      hidden: [false, ]
    });
  }
  ngOnInit() {
  }

}
