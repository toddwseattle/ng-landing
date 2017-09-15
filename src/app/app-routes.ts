import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
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
        component: EditActivityComponent
    },
    {
        path: 'activity/:type/:key',
        component: AddActivityComponent
    },
    {
        path: 'activity/:type',
        component: AddActivityComponent
    },
    {
        path: 'activity',
        component: AddActivityComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
