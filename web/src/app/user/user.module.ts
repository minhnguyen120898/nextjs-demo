import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRouting } from './user.routing.module';
import { LayoutModule } from '../shared/layout/layout.module';
@NgModule({
    imports: [
        CommonModule,
        UserRouting,
        LayoutModule
    ],
    declarations: [
    ]
})
export class UserModule { }
