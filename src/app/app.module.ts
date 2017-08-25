import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdCheckboxModule, MdSidenavModule, MdCardModule, MdButtonModule,
         MdListModule, MdGridListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
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
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdButtonModule,
    MdGridListModule,
    MdCheckboxModule,
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
