import { Directive } from '@angular/core';

import { FsTypedListCellDirective } from '@firestitch/list';

export interface KitchenSinkRow {
  index: number;
  name: string;
  guid: string;
  input: string;
  checked?: boolean;
}

@Directive({
  selector: '[kitchenSinkCell]',
  standalone: true,
})
// @ts-expect-error Concrete `ngTemplateContextGuard` first parameter must be this class for the Angular language service; that is not a valid override of the generic `FsListCellDirective` static guard.
export class KitchenSinkListCellDirective extends FsTypedListCellDirective<KitchenSinkRow> {
  public static override ngTemplateContextGuard(
    directive: KitchenSinkListCellDirective,
    context: unknown,
  ): context is {
    $implicit: KitchenSinkRow;
    row: KitchenSinkRow;
    index: number;
    group: any;
    groupRow: any;
    groupIndex: number;
    groupChildren: KitchenSinkRow[];
    expanded: boolean;
  } {
    return true;
  }
}
