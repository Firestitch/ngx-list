import {
  ContentChildren,
  Directive,
  Input,
  QueryList,
  isDevMode,
} from '@angular/core';

import { FsListColumnDirective } from '../column/column.directive';


/**
 * Declares an alternate set of columns that replaces the desktop columns at `maxWidth`
 * and below.
 *
 * ```html
 * <fs-list-breakpoint [maxWidth]="1000">
 *   <fs-list-column name="name">
 *     <ng-template fs-list-header>Record</ng-template>
 *     <ng-template fs-list-cell let-row="row">{{ row.name }}</ng-template>
 *   </fs-list-column>
 * </fs-list-breakpoint>
 * ```
 *
 * Children are ordinary `<fs-list-column>` elements supporting every slot -- header, cell,
 * footer, group-header and group-footer. A column whose `name` matches one in the base set
 * inherits that column's templates for any slot it leaves undeclared, so a breakpoint set
 * only has to declare what differs.
 *
 * The header slot is the exception: it is never inherited. The header row is exactly what
 * the active set declares -- an `<ng-template fs-list-header>` or a `title` attribute on
 * that set's own columns -- so a set that declares neither renders an empty header row
 * (kept only for the select-all checkbox and the other structural cells).
 *
 * Several sets can be stacked; the narrowest matching one wins.
 *
 * This is a real element rather than an attribute so that its columns are excluded from
 * `FsListComponent`'s `@ContentChildren(FsListColumnDirective)` for free -- Angular's
 * `descendants: false` query walks up through `<ng-container>` but stops at an element.
 * It renders no DOM: `<fs-list>` only projects `[fs-list-content]`.
 */
@Directive({
  selector: 'fs-list-breakpoint',
  standalone: true,
})
export class FsListBreakpointDirective {

  @ContentChildren(FsListColumnDirective)
  public columnDirectives: QueryList<FsListColumnDirective>;

  private _maxWidth: number = null;

  /** Upper bound in px, inclusive. Accepts `1000`, `'1000'` or `'1000px'`. */
  @Input()
  public set maxWidth(value: number | string) {
    const parsed = typeof value === 'number'
      ? value
      : Number.parseInt(value, 10);

    this._maxWidth = Number.isFinite(parsed) ? parsed : null;

    if (isDevMode() && this._maxWidth === null) {
      console.warn(
        `[fs-list-breakpoint] Ignoring invalid maxWidth "${value}". ` +
        'Expected a pixel value, e.g. [maxWidth]="1000".',
      );
    }
  }

  public get maxWidth(): number {
    return this._maxWidth;
  }

  /**
   * Suppress the selection checkbox cell while this set is active.
   * Leave unset to inherit the list's selection config.
   */
  @Input()
  public selection: boolean | null = null;

  /**
   * Suppress the row-actions cell while this set is active.
   * Leave unset to inherit the list's row actions.
   */
  @Input()
  public rowActions: boolean | null = null;

  /**
   * Suppress the drag handle cell while this set is active. Dragging a row is an awkward
   * gesture on a narrow touch device, so `[reorder]="false"` is the common case here.
   * Leave unset to inherit the list's reorder config.
   */
  @Input()
  public reorder: boolean | null = null;

}
