import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';

export const routes: Routes = [
    {
        path: '', component: ContactsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild()
    ],
    declarations: [
        ContactsComponent
    ],
    providers: [
    ]
})
export class ContactsModule { }
