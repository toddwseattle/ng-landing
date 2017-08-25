import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ActivityGridComponent } from './activity-grid.component';
import { ActServiceService } from '../common/act-service.service';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

describe('ActivityGridComponent', () => {
  let component: ActivityGridComponent;
  let fixture: ComponentFixture<ActivityGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase, 'ng-landing'),
      //  AngularFireDatabaseModule
      ],
      declarations: [ ActivityGridComponent ],
      providers: [ ActServiceService, AngularFireDatabase],
      schemas: [ NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should have a cols property', () => {
    expect(component.cols).toBeDefined();
  });
  it('should have Sizecols function', () => {
    expect(component.sizeCols).toBeDefined();
  });
  it('sizeCols should return 1 if passed a small value', () => {
    expect(component.sizeCols(6)).toBeCloseTo(1);
  });
  it('sizeCols should return 3 if passed a value larger than 900', () => {
    expect(component.sizeCols(901)).toBeCloseTo(3);
  });
    it('onResize Event should change columns property as a side effect', () => {
    component.onResize({ target: { innerWidth: 1300}});
    expect(component.cols).toBeCloseTo(4);
  });
});
