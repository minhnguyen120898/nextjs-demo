import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  @Input() data: any[] = [];
  @Output() outputAction = new EventEmitter()

  id: string = '';

  time = {
    month_prev: 0,
    month_curent: 0,
    month_next: 0,
    year: 0
  }
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  currentDay = new Date().getDate();
  days = [
    'M', 'T', 'W', 'T', 'F', 'S', 'S'
  ];
  daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(simples: SimpleChanges | any) {
    // setTimeout(() => {
    //   this.renderCal({
    //     year: new Date().getFullYear(), 
    //     month: new Date().getMonth()
    //   }, this.id,
    //    this.currentDay);
    // }, 500);
  }

  renderCal(initTime: { year: number, month: number },
    id: string,
    data: [{
      start: number,
      end: number,
      title: string
    }] | [],
    today?: any) {

    this.id = id;
    console.log(initTime);
    
    this.time.month_curent = initTime.month;
    this.time.year = initTime.year;
    const parentBox = <HTMLElement>document.getElementById('calendar-main');
    parentBox.innerHTML = '';
    for (let index = 0; index < 7; index++) {
      let divColum = document.createElement('div');
      divColum.classList.add('day-column');
      divColum.id = `${id}${index}`;
      let firstColumn = document.createElement('p');
      firstColumn.classList.add('th');
      if (index == 6) {
        divColum.classList.add('off');
      }
      firstColumn.textContent = this.daysName[index];
      divColum.appendChild(firstColumn);
      parentBox.appendChild(divColum);
    }


    const currentMonths = this.monthNames[initTime.month];
    const getNumDays = new Date(initTime.year, initTime.month + 1, 0).getDate();
    for (let i = 1; i <= getNumDays; i++) {
      let dayPTag = document.createElement('p');
      if (today && i == today) {
        dayPTag.classList.add('today');
      }
      dayPTag.style.padding = "3px";
      dayPTag.style.height = "65px";
      dayPTag.style.display = "block";
      dayPTag.style.textAlign = "left";
      dayPTag.style.fontSize = "14px";
      dayPTag.style.backgroundColor = "#FAFAFA";
      dayPTag.classList.add('main-normal');



      //trying  to get March 30,2021
      let date = currentMonths + " " + i.toString() + ", " + initTime.year;
      const currentNumberOfDay = new Date(date).getDay();
      let dayOfWeek = `${id}${currentNumberOfDay}`;

      if (i == 1 && currentNumberOfDay > 0) {
        for (let index = 0; index < new Date(date).getDay(); index++) {
          let newE = document.createElement('p');
          newE.style.padding = "3px";
          newE.style.display = "block";
          newE.style.height = "65px";
          newE.style.lineHeight = "2";
          newE.style.textAlign = "left";
          newE.style.fontSize = "14px";
          newE.style.color = "#464646";
          newE.style.backgroundColor = "#FAFAFA";
          newE.classList.add('main-normal');
          newE.appendChild(document.createTextNode(''));
          document.getElementById(`${id}${index}`)?.appendChild(newE);
        }
      }

      let dayText = document.createTextNode(i.toString());
      dayPTag.appendChild(dayText);

      // text 
      let arrWork = data.filter(e => { return e.start <= i && e.end >= i });

      for (let j = 0; j < arrWork.length; j++) {
        const labelE = arrWork[j];
        let label = document.createElement('label');
        label.innerText = labelE.title;

        dayPTag.appendChild(label)
      }

      document.getElementById(String(dayOfWeek))?.appendChild(dayPTag);
    }

    const timePrev = {
      year: initTime.year,
      month: Number(initTime.month) - 1
    }

    const timeNext = {
      year: initTime.year,
      month: Number(initTime.month) + 1
    }


    if (initTime.month - 1 == -1) {
      timePrev.month = 11;
      timePrev.year = Number(initTime.year) - 1;
    }
    if (initTime.month + 1 > 11) {
      timeNext.month = 0;
      timeNext.year = Number(initTime.year) + 1;
    }

    this.time.month_next = timeNext.month;
    this.time.month_prev = timePrev.month;

    this.renderCalPrev(timePrev.year, timePrev.month, id);
    this.renderCalNext(timeNext.year, timeNext.month, id);

  }

  renderCalPrev(year: any, month: any, id: string) {

    const parentBox = <HTMLElement>document.getElementById('calendar-child-prev');
    parentBox.innerHTML = '';
    for (let index = 0; index < 7; index++) {
      let divColum = document.createElement('div');
      divColum.classList.add('day-column');
      divColum.id = `prev-${id}${index}`;
      let firstColumn = document.createElement('p');
      firstColumn.classList.add('th');
      if (index == 6) {
        divColum.classList.add('off');
      }
      firstColumn.textContent = this.days[index];
      divColum.appendChild(firstColumn);
      parentBox.appendChild(divColum);
    }


    const currentMonths = this.monthNames[month];
    const getNumDays = new Date(year, month + 1, 0).getDate();


    for (let i = 1; i <= getNumDays; i++) {
      let dayPTag = document.createElement('p');
      dayPTag.style.padding = "3px";
      dayPTag.style.textAlign = "center";
      dayPTag.style.fontSize = "10px";
      dayPTag.style.margin = "5px 0";
      dayPTag.style.height = "21px";
      dayPTag.classList.add('prev-normal');


      //trying  to get March 30,2021
      let date = currentMonths + " " + i.toString() + ", " + year;
      const currentNumberOfDay = new Date(date).getDay();
      let dayOfWeek = `prev-${id}${currentNumberOfDay}`;

      if (i == 1 && currentNumberOfDay > 0) {
        for (let index = 0; index < new Date(date).getDay(); index++) {
          let newE = document.createElement('p');
          newE.classList.add('normal');
          newE.style.padding = "3px";
          newE.style.lineHeight = "2";
          newE.style.display = "block";
          newE.style.textAlign = "center";
          newE.style.fontSize = "10px";
          newE.style.color = "#464646";
          newE.style.height = "21px";
          newE.style.margin = "2px 0";
          newE.classList.add('prev-normal');

          newE.appendChild(document.createTextNode(''));
          document.getElementById(`prev-${id}${index}`)?.appendChild(newE);
        }
      }

      let dayText = document.createTextNode(i.toString());
      dayPTag.appendChild(dayText);
      document.getElementById(String(dayOfWeek))?.appendChild(dayPTag);
    }

    (<HTMLElement>document.getElementById('calendar-child-prev')).setAttribute('time', year + '-' + month)
  }

  renderCalNext(year: any, month: any, id: string) {

    const parentBox = <HTMLElement>document.getElementById('calendar-child-next');
    parentBox.innerHTML = '';
    for (let index = 0; index < 7; index++) {
      let divColum = document.createElement('div');
      divColum.classList.add('day-column');
      divColum.id = `next-${id}${index}`;
      let firstColumn = document.createElement('p');
      firstColumn.classList.add('th');
      if (index == 6) {
        divColum.classList.add('off');
      }
      firstColumn.textContent = this.days[index];
      divColum.appendChild(firstColumn);
      parentBox.appendChild(divColum);
    }


    const currentMonths = this.monthNames[month];
    const getNumDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= getNumDays; i++) {
      let dayPTag = document.createElement('p');

      dayPTag.style.padding = "3px";
      dayPTag.style.textAlign = "center";
      dayPTag.style.fontSize = "10px";
      dayPTag.style.margin = "5px 0";
      dayPTag.style.height = "21px";
      dayPTag.classList.add('next-normal');

      //trying  to get March 30,2021
      let date = currentMonths + " " + i.toString() + ", " + year;
      const currentNumberOfDay = new Date(date).getDay();
      let dayOfWeek = `next-${id}${currentNumberOfDay}`;

      if (i == 1 && currentNumberOfDay > 0) {
        for (let index = 0; index < new Date(date).getDay(); index++) {
          let newE = document.createElement('p');
          newE.style.padding = "3px";
          newE.style.lineHeight = "2";
          newE.style.textAlign = "center";
          newE.style.fontSize = "10px";
          newE.style.height = "21px";
          newE.style.color = "#464646";
          newE.style.margin = "5px 0";
          newE.classList.add('next-normal');

          newE.appendChild(document.createTextNode(''));
          document.getElementById(`next-${id}${index}`)?.appendChild(newE);
        }
      }

      let dayText = document.createTextNode(i.toString());
      dayPTag.appendChild(dayText);
      document.getElementById(String(dayOfWeek))?.appendChild(dayPTag);
    }
    (<HTMLElement>document.getElementById('calendar-child-next')).setAttribute('time', year + '-' + month);
  }

  clickPrev() {
    const time = document.getElementById('calendar-child-prev')?.getAttribute('time');
    if (time) {
      // this.renderCal({
      //   year: Number(time.split('-')[0]),
      //   month: Number(time.split('-')[1])
      // }, this.id, []);
      this.outputAction.emit({
        from: new Date(
          Number(time.split('-')[0]), 
          Number(time.split('-')[1]),
          1,
          0,
          0,
          1).getTime(),
          to: new Date(
            Number(time.split('-')[0]),
             Number(time.split('-')[1]),
              new Date(Number(time.split('-')[0]), Number(time.split('-')[1]), 0).getDate(),
            23,
            59,
            59
          ).getTime()
      });
    }
  }

  clickNext() {
    const time = document.getElementById('calendar-child-next')?.getAttribute('time');
    if (time) {
      // this.renderCal({
      //   year: Number(time.split('-')[0]),
      //   month: Number(time.split('-')[1])
      // }, this.id, []);

      this.outputAction.emit({
        from: new Date(
          Number(time.split('-')[0]), 
          Number(time.split('-')[1]),
          1,
          0,
          0,
          1).getTime(),
          to: new Date(
            Number(time.split('-')[0]),
             Number(time.split('-')[1]),
              new Date(Number(time.split('-')[0]), Number(time.split('-')[1]), 0).getDate(),
            23,
            59,
            59
          ).getTime()
      });
    }
  }
}
