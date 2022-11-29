import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouting } from './admin.routing.module';
import { LayoutModule } from '../shared/layout/layout.module';
import { AdminService } from './admin.service';

@NgModule({
    imports: [
        CommonModule,
        AdminRouting,
        LayoutModule
    ],
    declarations: [
    ],
    providers: [
       AdminService
    ]
})
export class AdminModule { }
