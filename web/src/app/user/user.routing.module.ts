import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./top/top.module').then(m => m.TopModule)
    }
];

export const UserRouting: ModuleWithProviders <any> = RouterModule.forChild(routes);