import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listblogpipe'
})
export class ListblogpipePipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
      }
      return  value.filter(p => (p.Title.toLowerCase().includes(Search)));
    }

}
