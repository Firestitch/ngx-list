import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[fs-list-cell]',
  standalone: true,
})
export class FsListCellDirective<T = any> {

  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public className: string | string[];
  @Input() public rowType?: T;

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
