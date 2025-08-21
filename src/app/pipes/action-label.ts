import { Pipe, PipeTransform } from '@angular/core';
import { Row } from '../models/row';



@Pipe({
    name: 'actionLabel',
    standalone: true
})
export class ActionLabelPipe implements PipeTransform {
  public transform(label, row: Row) {
    if (typeof label === 'function') {
      return label(row.data);
    }

    return label;
  }
}
