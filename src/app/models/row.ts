import { RowType } from '../enums/row-type.enum';

import { ChildRow, IChildRow } from './row/child-row';
import { GroupFooterRow, IGroupFooterRow } from './row/group-footer-row';
import { GroupRow, IGroupRow } from './row/group-row';
import { ISimpleRow, SimpleRow } from './row/simple-row';


export type Row = ISimpleRow | IGroupRow | IGroupFooterRow | IChildRow;

export function isGroupRow(row: Row): row is IGroupRow {
  return row.type === RowType.Group;
}

export function isChildRow(row: Row): row is IChildRow {
  return row.type === RowType.GroupChild;
}

export function isGroupFooterRow(row: Row): row is IGroupFooterRow {
  return row.type === RowType.GroupFooter;
}

export function isChildTypeRow(row: Row): row is IChildRow | IGroupFooterRow {
  return row.type === RowType.GroupChild || row.type === RowType.GroupFooter;
}

export function makeRowFactory(
  data: object,
  rowType: RowType,
  opts: { parent?: Row, initialExpand?: boolean } = {},
): Row {
  switch (rowType) {
    case RowType.Simple: {
      return new SimpleRow(data);
    }

    case RowType.Group: {
      return new GroupRow(data, opts.initialExpand);
    }

    case RowType.GroupChild: {
      return new ChildRow(data, opts.parent as IGroupRow);
    }

    case RowType.GroupFooter: {
      return new GroupFooterRow(data, opts.parent as IGroupRow);
    }
  }
}

