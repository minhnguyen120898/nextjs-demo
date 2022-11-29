import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
  DATE_TIME_IMPORT_FORMAT = 'D/M/YYYY H:m';
  DATE_TIME_SS_FORMAT = 'DD/MM/YYYY HH:mm:ss';
  DATE_FORMAT = 'DD/MM/YYYY';
  DATE_TIME_FORMAT_REPORT = 'MM月DD日HH:mm';
  DATE_TIME_FORMAT_RETURN = 'YYYY年MM月';
  DATE_IMPORT_FORMAT = 'D/M/YYYY';
  YEAR_MONTH_DATE_FORMAT = 'YYYY-MM-DD';
  DATE_TIME_SS_FORMAT_CONCAT = 'YYYYMMDDHHmmss'
  MIN_TIME = '1/1/1700';
  MAX_TIME = '1/1/50000';
  DATE_TIME_FORMAT_JAPAN = 'YYYY/MM/DD';
  


  constructor() { }
  getTimeUtcFromTime(time : any, format : string) {
    return moment(time, format).utc();
  }

  getTimeFromTimeFormat(time : any,  format : string) {
    return moment(time, format);
  }

  getTimeFormatFromTime(date : any,  format : string) {
    return date ? moment(date).format(format) : ''
  }

  getTimeStampFromDate(date : any) {
    return moment(date).unix();
  }

  getTimeStampFromDateFormat(date : any) {
    return this.getTimeFromTimeFormat(date, this.DATE_TIME_FORMAT).unix();
  }

  compareTwoDate(date1: any, date2: any) {
    return this.getTimeStampFromDateFormat(date1) - this.getTimeStampFromDateFormat(date2);
  }

  getTimeUctCurrent() {
    return moment.utc();
  }

  getTimeCurrent(format : string) {
    return moment(new Date()).format(format)
  }

  convertFormatToFormat(time: number, format1 : string, format2: string) {
    return this.getTimeFormatFromTime(this.getTimeFromTimeFormat(time, format1), format2)
  }

  addTime(time : number, dateAdd: any, format : string) {
    let result = this.getTimeFromTimeFormat(time, format);
    result.add(dateAdd, 'd')
    return this.getTimeFormatFromTime(result, format);
  }

  getTimeMomentCurrent() {
    return moment(new Date());
  }

  getDayBetweenTwoDate(date1 : any, date2: any) {
    if (!date1 || !date2) {
      return 0;
    }
    return Math.floor((date2.getTime() - date1.getTime()) / 86400000);
  }

  formatDateFromTimeUnix(val : any, timeFormat: string) {
    if (val === null || val === ''  ) {
      return '';
    }
    else {
      let d = new Date(val * 1000);
      return moment(d).format(timeFormat);
    }
  }

  getTimeUnixCurrentByFormat(format: string) {
    let time = moment().format(format);
    return this.getTimeUnixFromTimeFormat(time);
  }

  compareTwoDatesToGetDay(date1: any, date2: any) {
    if (date1 && date2) {
      let date1Unix = moment.unix(date1);
      date1Unix.hour(0)
      date1Unix.minute(0)
      date1Unix.second(0);

      let date2Unix = moment.unix(date2);
      date2Unix.hour(0)
      date2Unix.minute(0)
      date2Unix.second(0);
      return date1Unix.unix() - date2Unix.unix();
    }
    return 0;
  }

  getTimeUnixFromTimeFormat(val : any) {
    if (val === null || val === ''  ) {
      return null
    } else {
      return moment(val, this.DATE_TIME_SS_FORMAT).unix();
    }
  }
  getTimeUnixFromTimeFormatUTC(val : any) {
    if (val === null || val === ''  ) {
      return null
    } else {
      return moment.utc(val, this.DATE_TIME_SS_FORMAT).unix();
    }
  }
  getTimeUnixFromTimeFormatYMD(val : any) {
    if (val === null || val === ''  ) {
      return null
    } else {
      return moment(val, this.YEAR_MONTH_DATE_FORMAT).unix();
    }
  }
  getTimeUnixFromTimeFormatYMDHMS(val: any) {
    if (val === null || val === ''  ) {
      return null
    } else {
      return moment(val, this.DATE_TIME_SS_FORMAT_CONCAT).unix();
    }
  }

  getTimeUnixFromTimeFormatJapan(val: any) {
    if (val === null || val === ''  ) {
      return null
    } else {
      return moment(val, this.DATE_TIME_FORMAT_JAPAN).unix();
    }
  }

  getTimeUnixFromDate(val : any) {
    if (val === null || val === ''  ) {
      return null
    } else {
      return moment(val, this.YEAR_MONTH_DATE_FORMAT).unix();
    }
  }

  getTimeUnixCurrent() {
    return moment().unix();
  }

  validateDateTime(time : number, format: string, startTime: number) {
    let wrongFormat = !moment(time, format, true).isValid();
    if (wrongFormat) {
      return `Invalid date format, please key in date in format ${format}`
    } else if (startTime && this.compareTwoDate(startTime, time) > 0) {
      return 'Invalid Date'
    } else {
      return null;
    }
  }

  validateDate(time : number, format: string) {
    let wrongFormat = !moment(time, format, true).isValid();
    if (wrongFormat) {
      return `Invalid date format, please key in date in format ${format}`
    } else {
      return null;
    }
  }

  getDateAndTimeByTimeUnix(time : number) { // cover TimeUnix to year, month, day, hour, minutes 
    let date = moment(time*1000).toDate();
    let abc= { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate(), hour: date.getHours(),minutes: date.getMinutes() }
    return abc;
  }

  daysInMonth(month: number, year : number) {
    return new Date(year, month, 0).getDate();
  }
}
