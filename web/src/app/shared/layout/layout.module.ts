import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLayoutComponent } from './primary-layout/primary-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { RouterModule } from '@angular/router';
import { FooterComponent } from '../core/footer/footer.component';
import { HeaderComponent } from '../core/header/header.component';
import { SideNavComponent } from '../core/side-nav/side-nav.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PipeCustomModule } from '../pipe/pipe.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule.forChild(),
        PipeCustomModule,
        FormsModule
    ],
    declarations: [
        PrimaryLayoutComponent,
        MainLayoutComponent,
        FooterComponent,
        HeaderComponent,
        SideNavComponent
    ],
    exports: [
        PrimaryLayoutComponent,
        MainLayoutComponent,
        FooterComponent,
        HeaderComponent,
        SideNavComponent
    ]
})
export class LayoutModule { }
