import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listpartenairespipe'
})
export class ListpartenairespipePipe implements PipeTransform {

  transform(value: any[], Search: string): any {
    if (Search === '' || Search === null || Search === undefined) {
      return value;
      }
      return  value.filter(p => (p.nomPartenaire.toLowerCase().includes(Search)));
    }

}
