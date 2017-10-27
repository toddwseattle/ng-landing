import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// material design and FxFlex
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule, MdInputModule, MdCheckboxModule, MdSidenavModule, MdCardModule,
         MdButtonModule, MdSelectModule, MdListModule, MdGridListModule, MdIconModule,
         MdExpansionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app-routes';
import { SocialNetsComponent } from './social-nets/social-nets.component';
import { ActivityGridComponent } from './activity-grid/activity-grid.component';

import { AddActivityComponent } from './add-activity/add-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { InputFileComponent } from './input-file/input-file.component';
import { ByteFormatPipe } from './byte-format.pipe';




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SocialNetsComponent,
    ActivityGridComponent,
    AddActivityComponent,
    EditActivityComponent,
    InputFileComponent,
    ByteFormatPipe,
  ],
  imports: [
    CoreModule,
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
    MdIconModule,
    MdExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng-landing'),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
