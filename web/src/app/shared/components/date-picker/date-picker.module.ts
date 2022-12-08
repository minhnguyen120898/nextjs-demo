import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
@NgModule({
    declarations: [
        DatePickerComponent,
        CalendarViewComponent
    ],
    imports: [CommonModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    exports: [
        DatePickerComponent,
        CalendarViewComponent
    ],
    providers: [
        { provide: OWL_DATE_TIME_LOCALE, useValue: 'ja-JP' },
    ],
})
export class DatePickerModule { }