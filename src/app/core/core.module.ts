import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabase
  ],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule { }
