import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateformat' })
export class DateFormat implements PipeTransform {
    transform(text: string, num?: number) {
        if (!text) {
            text = ' ';
        }
        const convert_text = text.split('/');
        return `${convert_text[0]}年${convert_text[1]}月${convert_text[2]}日`;
    }
}
