import { NgModule } from '@angular/core';
// services
import { AuthService } from './auth.service';

import { ActServiceService } from './act-service.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { GoogleTagsService } from '../google-tags.service';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [
  ],
  providers: [AuthService, AuthGuard, AdminGuard, ActServiceService, GoogleTagsService ]
})
export class CoreModule { }
