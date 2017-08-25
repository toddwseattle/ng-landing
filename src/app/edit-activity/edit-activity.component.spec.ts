import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActServiceService } from '../common/act-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseMock } from '../common/activity-data-fb-mock';
import { MdListModule } from '@angular/material';

import { EditActivityComponent } from './edit-activity.component';

describe('EditActivityComponent', () => {
  let component: EditActivityComponent;
  let fixture: ComponentFixture<EditActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivityComponent ],
      imports: [MdListModule],
      schemas: [ NO_ERRORS_SCHEMA],
      providers: [ActServiceService,  {provide: AngularFireDatabase, useValue: AngularFireDatabaseMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should load 1 or more activites in the constructor', () => {
    component = fixture.componentInstance;
    component.activities$.subscribe(acts => {
      expect(acts.length > 0);
    });
  });

  it('should have a method called addActivity', () => {
    component = fixture.componentInstance;
    expect(component.addActivity).toBeTruthy();
  });
});
