import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDropdownComponent } from './select-dropdown.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild()
    ],
    declarations: [
        SelectDropdownComponent
    ],
    exports: [
        SelectDropdownComponent
    ]
})
export class SelectDropdDownModule { }
