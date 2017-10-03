import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACTIVETYPE, allActivities, IActivity,
         AngelActivity, ClassActivity, DevProjectActivity,
         InvestmentActivity, NonProfitActivity, PresentationActivity,
         IImage, ILink, IActivityGeneralProps, getTypefromString
         } from '../common/activity';
import { ActServiceService } from '../common/act-service.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Thenable } from 'firebase';

// interface to mimic shape of the form
interface IAddActivity {
    activetype: ACTIVETYPE;
    general: IActivityGeneralProps;
    investment: {
      divergent: boolean;
      companyLabel: string;
      companyUrl: string;
      crunchbaseUrl: string;
    };
    class: {
      schoolUrl: string;
      schoolLabel: string;
      departmentUrl: string;
      departmentLabel: string;
      syllabusUrl: string;
    };
    nonprofit: {
      orgLabel: string;
      orgUrl: string;
    };
    devproject: {
      projectLabel: string;
      projectUrl: string;
      gitUrl: string;
    };
    present: {
      presentUrl: string;
    };
  }


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit, OnDestroy {
  generalForm: FormGroup;
  allActivities = allActivities;
  $currentActivity: Observable<IActivity> = null;
  actsub: Subscription;
  editmode = false;
  currentActivityType = ACTIVETYPE.Investment;
  urlpattern= /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;



  constructor(private fb: FormBuilder, public router: Router, public route: ActivatedRoute, public as: ActServiceService) {

    this.createGeneralform();
   }

   ngOnInit() {
    this.$currentActivity = this.route.paramMap.switchMap( (params: ParamMap) => {
      if ( getTypefromString(params.get('type')) ) {
        const pm = params.get('type');
        const aty = getTypefromString(pm);
        this.currentActivityType = aty;
      }
      return(this.as.getActivitybyKey(this.currentActivityType, params.get('key')));
    });
     if (this.$currentActivity != null) {
       this.actsub = this.$currentActivity.subscribe(curact => {
         if (curact.$key !== 'null') {
            this.patchgeneralForm(curact);
            // bug bug need to patch specific values for each type
            this.patchactivitySpecific(curact);
            this.editmode = true;
         }

      });
    }

  }
  patchactivitySpecific(a: IActivity) {
    switch (a.activetype) {
     // case ACTIVETYPE.Angel:
      case ACTIVETYPE.Investment:
          this.patchInvestment(a);
          break;
      case ACTIVETYPE.Class:
          this.patchClass(a as ClassActivity);
          break;
      case ACTIVETYPE.DevProject:
          this.patchDev(a as DevProjectActivity);
          break;
      case ACTIVETYPE.NonProfit:
          this.patchNonProfit(a as NonProfitActivity);
          break;
      case ACTIVETYPE.Presentation:
          this.patchPrez(a as PresentationActivity);
          break;
      default:
        break;
    }
  }

  patchgeneralForm(act) {
    this.generalForm.patchValue({ activetype: this.currentActivityType, general: this.genPropsfromActivity(act) });

  }
  ngOnDestroy() {
    this.actsub.unsubscribe();
  }

  genPropsfromActivity(a: IActivity): IActivityGeneralProps {
    return ({
               activetype: a.activetype,
               name: a.name,
               start: (new Date(a.dateStart).toISOString().slice(0, 10)),
               end: a.dateEnd > 0 ? (new Date(a.dateEnd).toISOString().slice(0, 10)) : '',
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

  updateEditfromCreatepromise(a: IActivity) {
    if (a.$key) {
      this.$currentActivity = this.as.getActivitybyKey(a.activetype, a.$key);
    }
  }
  createOrSave(a: IActivity): void {
    if (!this.editmode) {
      this.as.createActivity(a).then(av => this.updateEditfromCreatepromise(av));
     } else {
       this.as.updateActivity(a).then(av => this.updateEditfromCreatepromise(av));
     }
  }
  createAndsaveDev(value: IAddActivity, valid: boolean) {
    const image: IImage = this.getImagefromIAddActivity(value);
    const orglink: ILink = {label: value.devproject.projectLabel,
                           Url: value.devproject.projectUrl };
    value.general.image = image;
    const dev = new DevProjectActivity(value.general, orglink);
    dev.repository = {label: value.devproject.gitUrl, Url: value.devproject.gitUrl};
    this.createOrSave(dev);
  }

  patchDev(dev: DevProjectActivity) {
    this.generalForm.patchValue({ devproject:
             {projectLabel: dev.organization.label, projectUrl: dev.organization.Url, gitUrl: dev.repository.Url } });
  }

  createAndsaveNonProfit(value: IAddActivity, valid: boolean) {
      const image: IImage = this.getImagefromIAddActivity(value);
      const orglink: ILink = {label: value.nonprofit.orgLabel,
                             Url: value.nonprofit.orgUrl };
      value.general.image = image;
      const np = new NonProfitActivity(value.general, orglink);
      this.createOrSave(np);
    }

  patchNonProfit(np: NonProfitActivity) {
      this.generalForm.patchValue({ nonprofit:
               {orgLabel: np.organization.label, orgUrl: np.organization.Url} });
    }
  createAndsavePresent(value: IAddActivity, valid: boolean) {
    const image: IImage = this.getImagefromIAddActivity(value);
    const orglink: ILink = {label: null,
                           Url: null };
    value.general.image = image;
    const prez = new PresentationActivity(value.general, orglink);
    prez.presentation = {label: value.present.presentUrl, Url: value.present.presentUrl};
    this.createOrSave(prez);
    }
  patchPrez(prez: PresentationActivity) {
    this.generalForm.patchValue({ presentation:
      {orgLabel: prez.presentation, orgUrl: prez.presentation} });
  }
  createAndsaveInvest(value: IAddActivity, valid: boolean) {
    const image: IImage = this.getImagefromIAddActivity(value);
    const orglink: ILink = {label: value.investment.companyLabel,
                           Url: value.investment.companyUrl };
    value.general.image = image;
    const vehicle = value.investment.divergent ? 'Divergent' : 'Angel';
    const inv = new InvestmentActivity(value.general, orglink, vehicle);
    inv.crunchbaseUrl = value.investment.crunchbaseUrl;
    this.createOrSave(inv);
  }

  patchInvestment(act: IActivity) {
    if (act.activetype === ACTIVETYPE.Investment) {
      const inv = act as InvestmentActivity;
      this.generalForm.patchValue({ investment:
        {divergent: (inv.vehicle.slice(0, 9) === 'Divergent'),
         companyLabel: inv.organization.label,
         companyUrl: inv.organization.Url,
         crunchbaseUrl: inv.crunchbaseUrl}});
    } else if (act.activetype === ACTIVETYPE.Angel) {
      const anginv = act as AngelActivity;
      this.generalForm.patchValue({investment: {companyLabel: anginv.organization.label, companyUrl: anginv.organization.Url,
        crunchbaseUrl: anginv.crunchbaseUrl, divergent: false }});
    }
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
    this.createOrSave(cls);
    }

    patchClass(cl: ClassActivity) {
      this.generalForm.patchValue( { class: {syllabusUrl: cl.syllabus.Url,
                syllabusLabel: cl.syllabus.label,
                departmentLabel: cl.department.label, departmentUrl: cl.department.Url}} );
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
        companyLabel: ['', Validators.required],
        companyUrl: ['', [Validators.required, Validators.pattern(this.urlpattern)]],
        crunchbaseUrl: ['http://www.crunchbase.com/', Validators.pattern(this.urlpattern) ]
      }),
      class: this.fb.group({
        schoolUrl: ['', [Validators.required, Validators.pattern(this.urlpattern)]],
        schoolLabel: ['', ],
        departmentUrl: ['', Validators.pattern(this.urlpattern)],
        departmentLabel: ['', ],
        syllabusUrl: ['', Validators.pattern(this.urlpattern)],
      }),
      nonprofit: this.fb.group({
        orgLabel: ['', Validators.required],
        orgUrl: ['', [Validators.required, Validators.pattern(this.urlpattern)]]
      }),
      devproject: this.fb.group({
        projectLabel: ['', ],
        projectUrl: ['', ],
        gitUrl: ['http://www.github.com/<username>/<repo>', [Validators.required, Validators.pattern(this.urlpattern)]]
      }),
      present: this.fb.group({
        presentUrl: ['', [Validators.required, Validators.pattern(this.urlpattern)]]
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
