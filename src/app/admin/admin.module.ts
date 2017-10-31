import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddActivityComponent } from '../add-activity/add-activity.component';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { InputFileComponent } from '../input-file/input-file.component';
import { ByteFormatPipe } from '../byte-format.pipe';
import { routing } from './admin.routing';

@NgModule({
  imports: [
    routing,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [AddActivityComponent, EditActivityComponent, InputFileComponent, ByteFormatPipe],
  providers: [ByteFormatPipe]
})
export class AdminModule { }
