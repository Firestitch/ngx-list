import { Component } from '@angular/core';
import {
  ExternalParamsController,
  IFilterSavedFilter,
  SavedFiltersController
} from '@firestitch/filter';
import { ReorderPosition, ReorderStrategy } from '../../classes/reorder-controller';
import { FsListConfig } from '../../interfaces/listconfig.interface';
import { map, tap } from 'rxjs/operators';


@Component({
  templateUrl: 'manage-saved-filters.component.html',
})
export class FsListManageSavedFiltersComponent {

  public config: FsListConfig;

  private _reorderReady = true;

  constructor(
    private _externalParams: ExternalParamsController,
  ) {
    this._initList();
  }

  private get savedFiltersController(): SavedFiltersController {
    return this._externalParams.savedFiltersController;
  }

  private _initList(): void {
    this.config = {
      status: false,
      filterInput: false,
      queryParam: false,
      persist: false,
      paging: false,
      reorder: {
        position: ReorderPosition.Left,
        strategy: ReorderStrategy.Always,
        moveDrop: () => {
          return this._reorderReady;
        },
        done: (reorderData) => {
          this._reorderReady = false;

          const filterData = reorderData.map((data) => data.data);
          this.savedFiltersController.order(filterData)
            .pipe(
              tap(() => {
                this._reorderReady = true;
              }),
            )
            .subscribe(() => {});
        }
      },
      rowActions: [
        {
          label: 'Apply',
          click: (filter: IFilterSavedFilter) => {
            this._externalParams.setActiveSavedFilter(filter);
          },
        },
        {
          label: 'Delete',
          remove: {
            title: 'Confirm',
            template: 'Are you sure you want to delete this filter?',
          },
          click: (savedFilter) => {
            return this.savedFiltersController.delete(savedFilter);
          },
        },
      ],
      fetch: (query) => {
        return this.savedFiltersController.load()
          .pipe(
            map((response) => {
              return { data: response };
            }),
          );
      }

    }
  }
}
