import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateTimeAdapter, OwlDateTimeComponent } from 'ng-pick-datetime';
import { PickerType, SelectMode } from 'ng-pick-datetime/date-time/date-time.class';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() selectMode: SelectMode = 'single';
  @Input() pickerType: PickerType = 'both';
  @Input() date: string|number|Date = '';
  @Input() placeholder = '日付選択';
  @Input() startView: any = 'month';
  @Output() actionTime = new EventEmitter();
  constructor(dateTimeAdapter: DateTimeAdapter<any>) {
    dateTimeAdapter.setLocale('ja-JP'); // change locale to Japanese
  }

  ngOnInit(): void {
    // this.date = new Date(2018, 3, 10, 10, 30, 30);
  }

  getTime() {
  
    this.actionTime.emit(this.date);
  }
}
