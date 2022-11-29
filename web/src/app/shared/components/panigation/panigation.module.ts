import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PanigationComponent } from './panigation.component';
import { PagerService } from '../../services/helpers/pager.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [
        PanigationComponent
    ],
    exports: [
        PanigationComponent
    ],
    providers : [PagerService]
})
export class PanigationModule { }
