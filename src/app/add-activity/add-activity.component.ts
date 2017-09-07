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
  investmentForm: FormGroup;
  allActivities = allActivities;
  urlpattern= /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;


  constructor(private fb: FormBuilder, public router: Router) {
    this.createGeneralform();
   }
  createGeneralform() {
    this.generalForm = this.fb.group({
      type: [ACTIVETYPE.Investment, Validators.required],
      general: this.fb.group({
        name: ['', Validators.required],
        hasend: [false, ],
        start: [(new Date(Date.now())).toISOString().slice(0, 10) , ] ,
        end: [(new Date(Date.now())).toISOString().slice(0, 10), ],
        description: ['', ],
        hidden: [false, ],
        image: ['', ] }),
      investment: this.fb.group({
        divergent: [true, Validators.required],
        companylabel: ['', Validators.required],
        companyurl: ['', [Validators.required, Validators.pattern(this.urlpattern)]],
        crunchbaseurl: ['http://www.crunchbase.com/', Validators.pattern(this.urlpattern) ]
      }),
      class: this.fb.group({
        schoolUrl: ['', [Validators.required, Validators.pattern(this.urlpattern)]],
        schoolLabel: ['', ],
        departmentUrl: ['', Validators.pattern(this.urlpattern)],
        departmentLabel: ['', ],
        syllabusUrl: ['', Validators.pattern(this.urlpattern)],
      }),
      nonprofit: this.fb.group({
        orglabel: ['', Validators.required],
        orgurl: ['', [Validators.required, Validators.pattern(this.urlpattern)]]
      }),
      devproject: this.fb.group({
        giturl: ['http://www.github.com/<username>/<repo>', [Validators.required, Validators.pattern(this.urlpattern)]]
      }),
      present: this.fb.group({
        presenturl: ['', [Validators.required, Validators.pattern(this.urlpattern)]]
      })
    });
   }

  ngOnInit() {
  }

  isInvestment(a: ACTIVETYPE) {
    return((a === ACTIVETYPE.Investment) || (a === ACTIVETYPE.Angel));
  }

  isClass(a: ACTIVETYPE) {
    return(a === ACTIVETYPE.Class);
  }

  isNonprofit(a: ACTIVETYPE) {
    return(a === ACTIVETYPE.NonProfit);
  }

  isDevProject(a: ACTIVETYPE) {
      return(a === ACTIVETYPE.DevProject);
  }

  isPresent(a: ACTIVETYPE) {
    return(a === ACTIVETYPE.Presentation);
}
}
