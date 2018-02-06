import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './core/admin.guard';
import { BioComponent } from './bio/bio.component';
import { DivergentComponent } from './divergent/divergent.component';
import { ConsultingComponent } from './consulting/consulting.component';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canActivate: [AdminGuard]
    },
    {
        path: 'bio',
        component: BioComponent
    },
    {
        path: 'divergent',
        component: DivergentComponent
    },
    {
        path: 'consulting',
        component: ConsultingComponent
    },
    {
        path: 'activity/:type/:name',
        component: ActivityDetailComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
