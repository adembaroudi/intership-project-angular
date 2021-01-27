import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listmembrespipe'
})
export class ListmembrespipePipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
      }
      return  value.filter(p => (p.Firstname.toLowerCase().includes(Search))||(p.Lastname.toLowerCase().includes(Search)));
    }

}
