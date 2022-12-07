import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PageErrorComponent } from './page-error/page-error.component';
import { environment } from 'src/environments/environment';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { PrimaryLayoutComponent } from './shared/layout/primary-layout/primary-layout.component';
import { NotLoginGuard } from './shared/guards/not-login.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { AdminGuard } from './shared/guards/admin.guard';

export const APP_ROUTES: Routes = [
    {
        path: `${environment.routerLoginAdmin}`,
        component: PrimaryLayoutComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuard]
    },
    {
        path: '',
        component: MainLayoutComponent,
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'auth',
        component: MainLayoutComponent,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [NotLoginGuard]
    },
    {
        path: '**',
        component: PageErrorComponent,
    }
];
export const Routing: ModuleWithProviders <any> = RouterModule.forRoot(APP_ROUTES, {
    anchorScrolling: "enabled",
    onSameUrlNavigation: "reload",
    enableTracing: false,
    scrollPositionRestoration: "enabled",
    relativeLinkResolution: 'legacy'
});