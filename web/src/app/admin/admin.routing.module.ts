import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as config } from 'src/environments/environment';

export const routes: Routes = [
    {
        path: '', redirectTo: `/${config.routerLoginAdmin}/plan`,
        pathMatch: 'full'
    },
    {
        path: 'plan', loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule)
    },
    {
        path: 'notice', loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule)
    },
    {
        path: 'building', loadChildren: () => import('./building/building.module').then(m => m.BuildingModule)
    },
    {
        path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)
    },
    {
        path: 'banner', loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule)
    },
    {
        path: 'work', loadChildren: () => import('./work/work.module').then(m => m.WorkModule)
    }
];

export const AdminRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
