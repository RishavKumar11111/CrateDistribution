import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SupplierFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  // transform(items: any, term: string, excludes: any = []): any {
  //   if (!term || !items) return items;

  //   return SupplierFilterPipe.filter(items, term, excludes);
  // }

}
