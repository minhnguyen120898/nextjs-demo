import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertConfirmComponent } from './alert-confirm/alert-confirm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forChild()
    ],
    declarations: [
        AlertConfirmComponent
    ],
    exports: [
    ],
    providers: [
    ]
})
export class AlertModule { }
