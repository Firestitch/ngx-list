import { ChangeDetectionStrategy, Component, OnInit, ViewChild, signal } from '@angular/core';

import { FilterComponent, ItemType } from '@firestitch/filter';
import { FsListConfig } from '@firestitch/list';

import { Observable, of } from 'rxjs';

import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';


const CATEGORIES = [
  { name: 'Fruit', value: 1 },
  { name: 'Vegetable', value: 2 },
];

const PRODUCTS = [
  { name: 'Apple', value: 1, categoryId: 1 },
  { name: 'Banana', value: 2, categoryId: 1 },
  { name: 'Carrot', value: 3, categoryId: 2 },
  { name: 'Potato', value: 4, categoryId: 2 },
];

/**
 * Reproduces the dead `(filtersReady)` output.
 *
 * `FsListComponent.filterReady()` sets `_filterParamsReady`, and `_emitFiltersReadyEvent()`
 * refuses to emit without it -- but nothing calls `filterReady()`. So `(filtersReady)` never
 * fires, and anything waiting on it to capture the filter reference waits forever.
 *
 * Data is local on purpose: a remote fetch would add a second way for this example to fail,
 * and the point is that the undefined reference is the only thing that can break it.
 */
@Component({
  selector: 'filters-ready',
  templateUrl: './filters-ready.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsListComponent_1,
    FsListColumnDirective,
    FsListHeaderDirective,
    FsListCellDirective,
  ],
})
export class FiltersReadyComponent implements OnInit {

  @ViewChild('list', { static: true })
  public list: FsListComponent_1;

  public config: FsListConfig;

  public readonly readyCount = signal(0);
  public readonly skippedChanges = signal(0);
  public readonly lastError = signal<string>(null);

  private _filterRef: FilterComponent;

  public ngOnInit(): void {
    this.config = {
      status: false,
      paging: false,
      queryParam: false,
      persist: false,
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
        {
          name: 'categoryId',
          type: ItemType.AutoCompleteChips,
          label: 'Category',
          primary: true,
          // Guarded the way ProgramFilterService guards its category change: no crash,
          // it just silently stops clearing the dependent filter.
          change: () => {
            if (!this._filterRef) {
              this.skippedChanges.update((count) => count + 1);

              return;
            }

            this._filterRef.clearItem('productId');
          },
          values: (keyword) => this._search(CATEGORIES, keyword),
        },
        {
          name: 'productId',
          type: ItemType.AutoCompleteChips,
          label: 'Product',
          primary: true,
          // Unguarded, matching ProgramFilterService.getProgramFilter(). This is the line
          // that throws: `_filterRef` is only ever assigned from `(filtersReady)`.
          values: (keyword) => {
            try {
              const categoryIds = (this._filterRef.getItemValue('categoryId') || [])
                .map((item: { value: number }) => item.value);

              const products = categoryIds.length
                ? PRODUCTS.filter((product) => categoryIds.includes(product.categoryId))
                : PRODUCTS;

              return this._search(products, keyword);
            } catch (e) {
              // Surfaced on screen so the example reads without the devtools console open.
              this.lastError.set(e.message);

              throw e;
            }
          },
        },
      ],
      fetch: () => of({ data: PRODUCTS }),
    };
  }

  // Captures the filter the same way the consuming app does: the reference is only reachable
  // through this event, so it stays undefined for as long as the event stays dead.
  public filtersReady(): void {
    this.readyCount.update((count) => count + 1);
    this._filterRef = this.list.filterRef;
  }

  private _search(values: { name: string }[], keyword: string): Observable<any[]> {
    return of(
      values.filter((value) => {
        return !keyword || value.name.toLowerCase().includes(keyword.toLowerCase());
      }),
    );
  }
}
