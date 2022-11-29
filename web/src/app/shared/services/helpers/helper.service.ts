import { Injectable } from '@angular/core';
import { EncodeDecodeService } from './encode-decode.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private encodeDecodeService: EncodeDecodeService) {

  }
  convertDataSelect(arr: []) {
    let data = [];
    for (let index = 0; index < arr.length; index++) {
      data.push({ id: index, sortname: arr[index], itemName: arr[index] });
    }
    return data;
  }
  copyToClipboard(id: string) {
    const text = document.getElementById(id)?.innerText;
    const elem = document.createElement("textarea") as any;
    document.body.appendChild(elem);
    if (elem) {
      elem.value = text;
      elem.select();
    }
    document.execCommand("copy");
    document.body.removeChild(elem);
  }
  trundertext(text : string, number : number) {
    return text.length !== 0 ? (text.substr(0, number) + (text.length > number ? '...' : '')) : '';
  }

  convertCurency(value: string) {
    return `¥${String(value).replace(/(.)(?=(\d{3})+$)/g, '$1,')}`;
  }

}
