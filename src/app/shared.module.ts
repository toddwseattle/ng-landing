import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { HttpModule } from '@angular/http';
// material
import { MatToolbarModule, MatInputModule, MatCheckboxModule, MatSidenavModule, MatCardModule,
    MatButtonModule, MatSelectModule, MatListModule, MatGridListModule, MatIconModule,
    MatExpansionModule } from '@angular/material';
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
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatGridListModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatExpansionModule,
        FlexLayoutModule,
     ],
    exports:  [CommonModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterModule,
  //      BrowserAnimationsModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatButtonModule,
        MatGridListModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatExpansionModule,
        FlexLayoutModule,
        HttpModule
     ],
    providers: [],
})
export class SharedModule {}
