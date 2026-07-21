import { Directive, forwardRef } from '@angular/core';

import { FsListCellDirective, FsTypedListCellDirective } from '@firestitch/list';

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
  // Angular matches `@ContentChild(FsListCellDirective)` through the node injector, and a
  // directive is only registered under its own type -- a subclass is not found on its own.
  // Aliasing the base token is what makes `fs-list-column`'s cell query see this directive.
  providers: [
    {
      provide: FsListCellDirective,
      useExisting: forwardRef(() => KitchenSinkListCellDirective),
    },
  ],
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
