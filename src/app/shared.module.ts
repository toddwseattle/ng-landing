import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { HttpModule } from '@angular/http';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
        MatTooltipModule,
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
        MatTooltipModule,
        FlexLayoutModule,
        HttpModule
     ],
    providers: [],
})
export class SharedModule {}
