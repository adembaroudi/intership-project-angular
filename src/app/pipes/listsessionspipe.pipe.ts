import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listsessionspipe'
})
export class ListsessionspipePipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
      }
      return  value.filter(p => (p.title.toLowerCase().includes(Search)));
    }

}
