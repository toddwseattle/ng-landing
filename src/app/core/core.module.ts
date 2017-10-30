import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
// material and flex layout


// firebase related imports
import { AuthService } from './auth.service';

import { ActServiceService } from './act-service.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [
//    CommonModule,
  ],
  declarations: [],
  exports: [
  ],
  providers: [AuthService, AuthGuard, AdminGuard, ActServiceService ]
})
export class CoreModule { }
