import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// material design and FxFlex
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdInputModule, MdCheckboxModule, MdSidenavModule, MdCardModule,
         MdButtonModule, MdSelectModule, MdListModule, MdGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
// firebase related imports
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app-routes';
import { SocialNetsComponent } from './social-nets/social-nets.component';
import { ActivityGridComponent } from './activity-grid/activity-grid.component';

import { ActServiceService } from './common/act-service.service';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SocialNetsComponent,
    ActivityGridComponent,
    AddActivityComponent,
    EditActivityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdButtonModule,
    MdGridListModule,
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng-landing'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [ActServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
