import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'append'
})
export class AppendPipe implements PipeTransform {
    transform(value: string, url: string): string {
        if (value.includes(url)) {
            return value;
        } else {
            return `${url}${value}`;
        }
        
    }
}