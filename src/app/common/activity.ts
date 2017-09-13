/**
 * IActivity represents an activity for the personal site.  It contains all the basic fields available across all activities
 */
export enum ACTIVETYPE {Angel = 'Angel',
                        NonProfit = 'NonProfit',
                        Investment = 'Investment',
                        Class = 'Class',
                        DevProject = 'DevProject',
                        Presentation = 'Presentation'
                    }
export const allActivities = [ ACTIVETYPE.Angel, ACTIVETYPE.Class,
                         ACTIVETYPE.DevProject, ACTIVETYPE.Investment,
                          ACTIVETYPE.NonProfit, ACTIVETYPE.Presentation];



export interface  ILink {
    label: string;
    Url: string;
}
export interface IImage {
    Url: string;
    height: number;
    width: number;
    altText?: string;
}

// this matches the general part of the add form
export interface IActivityGeneralProps {
    activetype: ACTIVETYPE;
    name: string;
    description: string;
    hidden: boolean;
    image: IImage;
    hasend: boolean;
    start: string;
    end: string;
}

export interface IActivity {
  id: number;
  activetype: ACTIVETYPE;
  current: boolean;
  name: string;
  organization: ILink;
  description: string;
  image: IImage;
  dateStart?: number;
  dateEnd?: number;
  hidden: boolean;
  $ref?: any;
  $key?: any;
}

export class Activity implements IActivity {
  public id: number;
  public activetype: ACTIVETYPE;
  public current = true;
  public hidden = false;
  public name: string;
  public description: string;
  public image: IImage;
  public dateStart: number;
  public dateEnd: number;
  public $ref?: any;
  public $key?: any;

  constructor(gen: IActivityGeneralProps, public organization: ILink) {
    this.activetype = gen.activetype;
    this.hidden = gen.hidden;
    this.name = gen.name;
    this.description = gen.description;
    this.image = gen.image;
    this.dateStart = (new Date(gen.start)).getTime();
    if ( gen.hasend ) {
      this.dateEnd = (new Date(gen.end)).getTime();
      if (this.dateEnd < Date.now() ) {
        this.current = false;
      }
    } else {
        this.dateEnd = 0;
    }
  }

}

export class AngelActivity extends Activity {
    public crunchbaseUrl: string;
    constructor(gen: IActivityGeneralProps,  public organization: ILink) {
        super(gen, organization);
        this.activetype = ACTIVETYPE.Angel;
    }
}

export class NonProfitActivity extends Activity {
    constructor(gen: IActivityGeneralProps,  public organization: ILink) {
        super(gen, organization);
        this.activetype = ACTIVETYPE.NonProfit;
    }
}


export class InvestmentActivity extends Activity {
    public crunchbaseUrl: string;
    constructor(gen: IActivityGeneralProps, public organization: ILink, public vehicle = 'Angel') {
        super(gen, organization);
        this.activetype = ACTIVETYPE.Investment;
    }
}


export class ClassActivity extends Activity {
    public department: ILink;
    public syllabus: ILink;
    constructor(gen: IActivityGeneralProps, public organization: ILink) {
        super(gen, organization);
        this.activetype = ACTIVETYPE.Class;
    }
}


export class DevProjectActivity extends Activity {
    public repository: ILink; // github repository link
    constructor(gen: IActivityGeneralProps, public organization: ILink = {Url: null, label: null}) {
        super(gen, organization);
        this.activetype = ACTIVETYPE.DevProject;
    }
}


export class PresentationActivity extends Activity {
    public presentation: ILink;
    constructor(gen: IActivityGeneralProps, public organization: ILink = {Url: null, label: null}) {
        super(gen, organization);
        this.activetype = ACTIVETYPE.Presentation;
    }
}
