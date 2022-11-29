import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  date = null;
  @Input() placeholder  = '日付選択';
  constructor() { }

  ngOnInit(): void {
  }
  getTime(){

  }
}
