import { Directive, Input } from '@angular/core';

import type { FsListConfig } from '../../interfaces/listconfig.interface';


@Directive({
  selector: '[fs-list-cell],[fsListCell]',
  standalone: true,
})
export class FsListCellDirective<T = any> {

  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public className: string | string[];
  /**
   * Typing anchor (e.g. `readonly anchor = {} as MyRow` then `[rowType]="anchor"`).
   * The value is only used for template type inference; it can be an empty object cast.
   */
  @Input('fsListCell') public rowType?: T;


  /**
   * Same as `rowType`, for `*fsListCell="anchor"` microsyntax (`*fsListCell` expands to `[fsListCell]="..."`).
   * Pass a **component property** typed as `T` — not a type name (interfaces are not runtime values).
   */
  // @Input('fsListCell')
  // public set fsListCellAnchor(value: T | undefined) {
  //   this.rowType = value;
  // }

  /**
   * Filled by `fs-list` from merged `[config]` when you omit `[rowType]` / `[fsListCell]` and `cellRowType` is unset.
   * Optional: bind `[configTyping]="config"` for strictTemplates / IDE narrowing.
   */
  @Input() public configTyping?: FsListConfig<T>;

  public static ngTemplateContextGuard<T>(
    directive: FsListCellDirective<T>,
    context: unknown,
  ): context is {
    $implicit: T,
    row: T,
    index: number,
    group: any,
    groupRow: any,
    groupIndex: number,
    groupChildren: T[],
    expanded: boolean,
  } {
    return true;
  }
}
