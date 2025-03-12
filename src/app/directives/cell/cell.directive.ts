import { Directive, Input } from '@angular/core';


@Directive({ selector: '[fs-list-cell]' })
export class FsListCellDirective {

  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public className: string | string[];

  public static ngTemplateContextGuard(
    directive: FsListCellDirective,
    context: unknown,
  ): context is {
    $implicit: any,
    row: any,
    index: number,
    group: any,
    groupRow: any,
    groupIndex: number,
    groupChildren: any[],
    expanded: boolean,
  } {
    return true;
  }
}
