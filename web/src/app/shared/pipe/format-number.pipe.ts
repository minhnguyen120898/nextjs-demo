import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatnumber' })
export class FormatNumberPipe implements PipeTransform {
    transform(text: string, num?: number) {
        if (!text) {
            text = ' ';
        }
        return String(text).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    }
}
