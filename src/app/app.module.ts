import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material design and FxFlex
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app-routes';
import { SocialNetsComponent } from './social-nets/social-nets.component';
import { ActivityGridComponent } from './activity-grid/activity-grid.component';

import { LoginComponent } from './login/login.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { BioComponent } from './bio/bio.component';
import { DivergentComponent } from './divergent/divergent.component';
import { ConsultingComponent } from './consulting/consulting.component';




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SocialNetsComponent,
    ActivityGridComponent,
    LoginComponent,
    ActivityDetailComponent,
    BioComponent,
    DivergentComponent,
    ConsultingComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
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
