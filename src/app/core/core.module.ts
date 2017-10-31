import { NgModule } from '@angular/core';
// services
import { AuthService } from './auth.service';

import { ActServiceService } from './act-service.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [
  ],
  providers: [AuthService, AuthGuard, AdminGuard, ActServiceService ]
})
export class CoreModule { }
