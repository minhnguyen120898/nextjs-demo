import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  @Input() id: string = '';
  @Input() nextMonth: boolean = false;

  year = new Date().getFullYear()//2021
  month = new Date().getMonth()//march
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  currentDay = new Date().getDate();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(simples: SimpleChanges) {
    if (simples.nextMonth && simples.nextMonth.currentValue == false) {
      setTimeout(() => {
        this.renderCal(new Date().getFullYear(), new Date().getMonth(), this.id, this.currentDay);
      }, 500);
    }
    if (simples.nextMonth && simples.nextMonth.currentValue == true) {
      setTimeout(() => {
        this.month += 1;
        this.renderCal(new Date().getFullYear(), new Date().getMonth() + 1, this.id);
      }, 500);
    }
  }

  renderCal(year: any, month: any, id: string, today?: any) {
    const currentMonths = this.monthNames[month];
    const getNumDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= getNumDays; i++) {
      let dayPTag = document.createElement('p');
      if (today && i == today) {
        dayPTag.style.backgroundColor = '#FFF99D';
        dayPTag.style.fontWeight = 'bold';
      }
      dayPTag.style.padding = "1px 3px";
      dayPTag.style.height = "20px";
      dayPTag.style.lineHeight = "2";
      dayPTag.style.textAlign = "center";
      //trying  to get March 30,2021
      let date = currentMonths + " " + i.toString() + ", " + year;
      const currentNumberOfDay = new Date(date).getDay();
      let dayOfWeek = `${id}${currentNumberOfDay}`;

      if (i == 1 && currentNumberOfDay > 0) {
        for (let index = 0; index < new Date(date).getDay(); index++) {
          let newE = document.createElement('p');
          newE.style.padding = "1px 3px";
          newE.style.height = "20px";
          newE.style.lineHeight = "2";
          newE.style.textAlign = "center";
          newE.appendChild(document.createTextNode(''));
          document.getElementById(`${id}${index}`)?.appendChild(newE);
        }
      }

      let dayText = document.createTextNode(i.toString());
      dayPTag.appendChild(dayText);
      document.getElementById(String(dayOfWeek))?.appendChild(dayPTag);
    }
  }

}
