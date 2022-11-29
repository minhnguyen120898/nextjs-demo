import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

@NgModule({
    declarations: [
        DatePickerComponent,
        CalendarViewComponent
    ],
    imports: [ CommonModule , FormsModule, OwlNativeDateTimeModule, OwlDateTimeModule],
    exports: [
        DatePickerComponent,
        CalendarViewComponent
    ],
    providers: [],
})
export class DatePickerModule {}