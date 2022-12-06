import { Pipe, PipeTransform } from '@angular/core';
import { Row } from '../models/row';



@Pipe({ name: 'actionLabel' })
export class ActionLabelPipe implements PipeTransform {
  public transform(label, row: Row) {
    if (typeof label === 'function') {
      return label(row.data);
    }

    return label;
  }
}
