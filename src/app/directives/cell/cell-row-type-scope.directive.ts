import { Directive, Input } from '@angular/core';

/**
 * Wrap list columns in `<ng-container fsListCellRowType [rowType]="anchor" #cr="fsListCellRowType">`.
 * On each `fs-list-cell`, bind `[rowType]="cr.rowType"` so `ngTemplateContextGuard` reuses the same
 * type without repeating `{} as YourRow` on every cell.
 */
@Directive({
  selector: '[fsListCellRowType]',
  standalone: true,
  exportAs: 'fsListCellRowType',
})
export class FsListCellRowTypeScopeDirective<T = unknown> {

  @Input() public rowType?: T;
}
