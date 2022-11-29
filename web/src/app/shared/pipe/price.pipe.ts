import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {
    transform(value: any): any {
        if (!value) {
            value = ' ';
        }
        if (value == 0) {
            return '¥0'
        }
        return '¥' + String(value).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    }
}