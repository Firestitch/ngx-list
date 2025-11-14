
import { RowType } from '../../enums/row-type.enum';

import { BaseRow, IBaseRow } from './_base-row';

export interface ISimpleRow extends IBaseRow {
  type: RowType.Simple;
}

export class SimpleRow extends BaseRow<RowType.Simple> implements ISimpleRow {

  protected _rowType: RowType.Simple = RowType.Simple;
  
  constructor(data: object = {}) {
    super(data);
  }

  public destroy(): void {}

}
