import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { HttpModule } from '@angular/http';
// material
import { MdToolbarModule, MdInputModule, MdCheckboxModule, MdSidenavModule, MdCardModule,
    MdButtonModule, MdSelectModule, MdListModule, MdGridListModule, MdIconModule,
    MdExpansionModule } from '@angular/material';
  import { FlexLayoutModule } from '@angular/flex-layout';
// angularfire
  import { AngularFireAuthModule } from 'angularfire2/auth';
  import { AngularFireDatabaseModule } from 'angularfire2/database';
// byte format pipe
@NgModule({
    declarations: [],
    imports: [ CommonModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterModule,
//        BrowserAnimationsModule,
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
        FlexLayoutModule,
     ],
    exports:  [CommonModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterModule,
  //      BrowserAnimationsModule,
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
        FlexLayoutModule,
        HttpModule
     ],
    providers: [],
})
export class SharedModule {}
