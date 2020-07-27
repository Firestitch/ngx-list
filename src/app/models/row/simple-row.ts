import { RowType } from '../../enums/row-type.enum';
import { BaseRow } from './base-row';

export class SimpleRow extends BaseRow {

  constructor(
    data: any = {},
  ) {
    super(data, RowType.Simple);
  }


  public destroy(): void {
  }
}
