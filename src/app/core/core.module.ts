import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// firebase related imports
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule { }
