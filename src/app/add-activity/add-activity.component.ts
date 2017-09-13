import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACTIVETYPE, allActivities, IActivity,
         AngelActivity, ClassActivity, DevProjectActivity,
         InvestmentActivity, NonProfitActivity, PresentationActivity,
         IImage, ILink, IActivityGeneralProps
         } from '../common/activity';
import { ActServiceService } from '../common/act-service.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Thenable } from 'firebase';

// interface to mimic shape of the form
interface IAddActivity {
    activetype: ACTIVETYPE;
    general: IActivityGeneralProps;
    investment: {
      divergent: boolean;
      companylabel: string;
      companyurl: string;
      crunchbaseurl: string;
    };
    class: {
      schoolUrl: string;
      schoolLabel: string;
      departmentUrl: string;
      departmentLabel: string;
      syllabusUrl: string;
    };
    nonprofit: {
      orglabel: string;
      orgurl: string;
    };
    devproject: {
      giturl: string;
    };
    present: {
      presenturl: string;
    };
  }


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {
  generalForm: FormGroup;
  investmentForm: FormGroup;
  allActivities = allActivities;
  $currentActivity: Observable<IActivity> = null;
  currentActivityType = ACTIVETYPE.Investment;
  urlpattern= /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;



  constructor(private fb: FormBuilder, public router: Router, public route: ActivatedRoute, public as: ActServiceService) {

    this.createGeneralform();
   }

   ngOnInit() {
    this.$currentActivity=this.route.paramMap.switchMap( (params: ParamMap) => {
      if ( params.get('type')) {
        this.currentActivityType = ACTIVETYPE[params.get('type')];
        if ( params.get('key')) {
         return(this.as.getActivitybyKey(this.currentActivityType, params.get('key')));
        } else  {
           return null;
        }
      } else {
        return null;
      }
    });
      this.$currentActivity.subscribe(curact => {
        this.generalForm.patchValue({ activetype: curact.activetype, general: this.genPropsfromActivity(curact) });

      });

  }

  genPropsfromActivity(a: IActivity): IActivityGeneralProps {
    return ({
               activetype: a.activetype,
               name: a.name,
               start: (new Date(a.dateStart).toDateString()),
               end: a.dateEnd > 0 ? (new Date(a.dateEnd).toDateString()) : '',
               hasend: a.dateEnd > 0,
               hidden: a.hidden,
               description: a.description,
               image: a.image
             });
  }
  saveAndclose({value, valid}: {value: IAddActivity, valid: boolean}) {
    switch (value.activetype) {
      case ACTIVETYPE.Class: this.createAndsaveClass(value, valid);
        break;
      case ACTIVETYPE.DevProject:  this.createAndsaveDev(value, valid);
        break;
      case ACTIVETYPE.NonProfit:  this.createAndsaveNonProfit(value, valid);
        break;
      case ACTIVETYPE.Presentation:  this.createAndsavePresent(value, valid);
        break;
      case ACTIVETYPE.Investment:  this.createAndsaveInvest(value, valid);
        break;
      default:
        console.log('error');
      break;
    }
  }

  getImagefromIAddActivity(aa: IAddActivity): IImage {
    return({ Url: null, height: 0, width: 0 }); // bug bug this is temporary until there is an image chooser)
  }
  createAndsaveDev(value: IAddActivity, valid: boolean) {
    console.log('SaveDev not implemented');
    console.log('value : ' + value + 'valid:' + valid);
    }

  createAndsaveNonProfit(value: IAddActivity, valid: boolean) {
      console.log('Save NonProfit not implemented');
      console.log('value : ' + value + 'valid:' + valid);
    }
  createAndsavePresent(value: IAddActivity, valid: boolean) {
    console.log('Save Present not implemented');
    console.log('value : ' + value + 'valid:' + valid);
    }
  createAndsaveInvest(value: IAddActivity, valid: boolean) {
    console.log('Save Investment not implemented');
    console.log('value : ' + value + 'valid:' + valid);
  }

  createAndsaveClass(value: IAddActivity, valid: boolean)  {
    const classimage: IImage = this.getImagefromIAddActivity(value);
    const orglink: ILink = {label: value.class.schoolLabel,
                           Url: value.class.schoolUrl };
    value.general.image = classimage;
    const cls = new ClassActivity(value.general, orglink);
    cls.syllabus = {label: value.class.syllabusUrl, Url: value.class.syllabusUrl};
    cls.department = {
                      label: value.class.departmentLabel,
                      Url: value.class.departmentUrl
                      };
     this.as.createClass(cls).then(a => {
        if (a.key) {
          this.$currentActivity = this.as.getClass(a.key);
        }
     });
    }

  createGeneralform() {
    this.generalForm = this.fb.group({
      activetype: [this.currentActivityType, Validators.required],
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
