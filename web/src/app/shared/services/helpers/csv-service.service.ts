import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {

  constructor() { }
  /** 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   
   
   header = ['a', 'b', 'v', 'd'];
   data = [ 
     {
       p1: '',
       p2: '',
       p3: '
     },
     {
       p1: '',
       p2: '',
       p3: '
     }
   ]
   fields = [p1,p2,p3]
   
   
   
   
   **/
  exportToCsv(datas : any, headers: any, fields : any, filename: any) {
    var processRow = function (row : any) {
      var finalVal = '';

      for (var j = 0; j < fields.length; j++) {
        var innerValue = row[fields[j]] === null ? '' : row[fields[j]].toString();
        if (row[fields[j]] instanceof Date) {
          innerValue = row[fields[j]].toLocaleString();
        };
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = '"' + result + '"';
        }
         if (j > 0) {
          finalVal += ',';
        }
        finalVal += result;
      }


      return finalVal + '\n';
    };

    var csvFile = headers.toString() + '\n';
    for (var i = 0; i < datas.length; i++) {
      // console.log(datas[i]);
      csvFile += processRow(datas[i]);
    }

    var blob = new Blob(["\uFEFF"+csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename + '.csv');
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
