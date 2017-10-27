import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// firebase related imports
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ActServiceService } from './act-service.service';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [],
  providers: [AuthService, ActServiceService]
})
export class CoreModule { }