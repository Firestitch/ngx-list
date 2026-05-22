import { Directive } from '@angular/core';

import { FsListCellDirective } from './cell.directive';

/**
 * Extend with your own `selector` and row type `T` for strict template typing of `let-row="row"`
 * without repeating `[rowType]` on every `[fs-list-cell]` (subclasses still match column cell queries).
 *
 * For IDE / strictTemplates narrowing, **redeclare** `ngTemplateContextGuard` on the concrete class
 * with `directive: YourConcreteDirective` (inherited static guards are often not applied by the
 * language service). TypeScript may report an invalid override vs `FsListCellDirective`; use
 * `@ts-expect-error` on the class line above `export class` when required.
 */
@Directive()
export abstract class FsTypedListCellDirective<T = any> extends FsListCellDirective<T> {}
