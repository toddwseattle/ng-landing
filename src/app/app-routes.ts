import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './core/admin.guard';

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
        path: 'editactivity',
        component: EditActivityComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'activity/:type/:key',
        component: AddActivityComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'activity/:type',
        component: AddActivityComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'activity',
        component: AddActivityComponent,
        canActivate: [AdminGuard]
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
