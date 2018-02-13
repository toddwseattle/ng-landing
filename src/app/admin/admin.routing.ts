import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddActivityComponent } from '../add-activity/add-activity.component';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { AdminGuard } from '../core/admin.guard';

const adminRoutes: Routes = [
/*     {
        path: '',
        redirectTo: 'editactivity',
        pathMatch: 'full',
        canActivate: [AdminGuard]
    },
 */
     {
        path: '',
        component: EditActivityComponent,
        pathMatch: 'full',
        canActivate: [AdminGuard]
    },
    {
        path: 'editactivity',
        component: EditActivityComponent,
        pathMatch: 'full',
        canActivate: [AdminGuard]
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
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);
