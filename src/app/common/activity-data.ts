import { InvestmentActivity, ACTIVETYPE , IActivity, IImage } from './activity';
import { PlatformLocation } from '@angular/common';
export const  divergentinvestments: InvestmentActivity[] = [
  {
      id : 1,
      activetype: ACTIVETYPE.Investment,
      dateStart: null,
      dateEnd: null,
      current: false,
      name: 'TempoIQ',
      crunchbaseUrl: 'https://www.crunchbase.com/organization/tempo',
      organization: { Url: 'http://www.tempoiq.com', label: 'TempoIQ'},
      image : {
          Url: 'assets/images/tempo-small.svg',
          height : 40,
          width : 192
      },
      hidden: false,
      description : `TempoIQ is a Chicago Based company doing realtime time series alerting and analytics for the Internet of Things.
										 Divergent made an investment in 2013 and Todd served on the board of directors.
										 TempoIQ was sold to Avant in early 2015.`,
      vehicle: 'Divergent III'
  },
  {
    id: 2,
    activetype: ACTIVETYPE.Investment,
    dateStart: null,
    dateEnd: null,
    name: 'ReadyPulse',
    current: false,
    organization: { Url: 'http://www.readypulse.com', label: 'ReadyPulse'},
    crunchbaseUrl: 'https://www.crunchbase.com/organization/readypulse',
    image : {
          Url: 'assets/images/readypulse.png',
          height : 40,
          width : 192
      },
      hidden: false,
      description: `ReadyPulse provides marketers tools for demonstrating social proof at scale.  ReadyPulse enables brands to cultivate
								 brand ambasadors and find the most effective, authentic, and verified social proof to integrate into marketing.
								 Readypulse was sold to <a href="http://www.experticity.com">Experticity in 2015</a>`,
    vehicle: 'Divergent III'
},
{
  id: 3,
  activetype: ACTIVETYPE.Investment,
  dateStart: null,
  dateEnd: null,
  name: 'BlueTalon',
  current: true,
  organization: { Url:  'http://www.bluetalon.com', label: 'BlueTalon'},
  crunchbaseUrl: 'https://www.crunchbase.com/organization/bluetalon',
  image : {
     Url: 'http://bluetalon.com/wp-content/uploads/2014/11/BlueTalon-Logo-Small.png',
     height : 40,
     width : 192
     },
     hidden: false,
     description : `BlueTalon, a bay area company, provides a policy engine to help customers safeguard Hadoop data.
								The BlueTalon policy engine provisions and enforces your data access policies and provides controls on even the
								most sensitive data.  Todd serves as a board observer.`,
  vehicle: 'Divergent III'
}];
