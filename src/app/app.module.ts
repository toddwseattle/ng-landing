import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdSidenavModule, MdCardModule, MdButtonModule, MdListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app-routes';
import { SocialNetsComponent } from './social-nets/social-nets.component';




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    SocialNetsComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule, 
    MdCardModule,
    MdListModule,
    MdSidenavModule,
    MdButtonModule,
     RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
