import {  ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as config } from '../../environments/environment';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: `${config.routerLoginAdmin}/login`,

        component: LoginComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    }
];

export const AuthRouting: ModuleWithProviders <any> = RouterModule.forChild(routes);
