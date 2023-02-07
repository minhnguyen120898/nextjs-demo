import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./top/top.module').then(m => m.TopModule)
    },
    {
        path: 'course', loadChildren: () => import('./course/course.module').then(m => m.CousreModule)
    }
];

export const UserRouting: ModuleWithProviders <any> = RouterModule.forChild(routes);