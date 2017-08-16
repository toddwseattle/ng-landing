/**
 * IActivity represents an activity for the personal site.  It contains all the basic fields available across all activities
 */
export enum ACTIVETYPE {Angel, NonProfit, Investment, Class, DevProject, Presentation }

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

export interface IActivity {
  id: number;
  activetype: ACTIVETYPE;
  current: boolean;
  name: string;
  organization: ILink;
  description: string;
  image: IImage;
  dateStart?: Date;
  dateEnd?: Date;
}

export class Activity implements IActivity {
  id: number;
  activetype: ACTIVETYPE;
  current: boolean;
  constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage) {
    this.current = true;
  }
}

export class AngelActivity extends Activity {
    constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage) {
        super(name, organization, description, image);
        this.activetype = ACTIVETYPE.Angel;
    }
}

export class NonProfitActivity extends Activity {
    constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage) {
        super(name, organization, description, image);
        this.activetype = ACTIVETYPE.NonProfit;
    }
}


export class InvestmentActivity extends Activity {
    public crunchbaseUrl: string;
    constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage, public vehicle = 'Angel') {
        super(name, organization, description, image);
        this.activetype = ACTIVETYPE.Investment;
    }
}


export class ClassActivity extends Activity {
    constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage) {
        super(name, organization, description, image);
        this.activetype = ACTIVETYPE.Class;
    }
}


export class DevProjectActivity extends Activity {
    constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage) {
        super(name, organization, description, image);
        this.activetype = ACTIVETYPE.DevProject;
    }
}


export class PresentationActivity extends Activity {
    constructor(public name: string,  public organization: ILink,  public description: string,
                public image: IImage) {
        super(name, organization, description, image);
        this.activetype = ACTIVETYPE.Presentation;
    }
}
