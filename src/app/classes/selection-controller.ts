import { SelectionDialog, SelectionRef } from '@firestitch/selection';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { get as _get } from 'lodash-es';

import { FsListSelectionConfig } from '../interfaces';
import { Row } from '../models/row';

export enum SelectionChangeType {
  AllVisibleSelectionChange = 'AllVisibleSelectionChange',
  RowSelectionChange = 'RowSelectionChange',
  SelectedAll = 'SelectedAll',
}


export class SelectionController {

  // Options from passed config
  public actions = [];
  public selectAll = true;
  public selectionChangedFn;
  public actionSelectedFn;
  public allSelectedFn;

  public cancelledFn;

  // Store for selected visible rows
  public selectedRows = new Map();
  public selectedGroups = new Map();

  // Reference to selection dialog
  private _selectionDialogRef: SelectionRef = null;

  private _getRows: () => any[];
  private _selectionChange = new Subject<{ type: SelectionChangeType; payload: any }>();

  // Selected only visible rows (ex.: selected only limited 15 rows when we have pagination)
  private _selectedAllVisible = false;

  // Selected all rows when was clicked "Select All" in selection dialog
  // or count of visible records is equal to total and all visible rows was selected
  private _selectedAll = false;

  private _selectedRecords = 0;
  private _visibleRecordsCount = 0;
  private _totalRecordsCount = 0;

  private _destroy$ = new Subject();
  private _disabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    config: FsListSelectionConfig = {},
    private _trackBy: string,
    private _selectionDialog: SelectionDialog,
  ) {
    this.actions = config.actions ? [...config.actions] : [];
    this.actionSelectedFn = config.actionSelected;
    this.allSelectedFn = config.allSelected;
    this.cancelledFn = config.cancelled;
    this.selectionChangedFn = config.selectionChanged;
    this.selectAll = config.selectAll;
    this._disabled$.next(!!config.disabled);
  }

  public get disabled(): boolean {
    return this._disabled$.getValue();
  }

  public get disabled$(): Observable<boolean> {
    return this._disabled$.asObservable();
  }

  public get selectedAll() {
    return this._selectedAll;
  }

  public get selectionChange$() {
    return this._selectionChange.pipe(takeUntil(this._destroy$));
  }

  public setRowsCallback(data: () => any[]) {
    this._getRows = data;
  }

  /**
   * Trigger when row was selected
   *
   * @param row
   * @param checked
   */
  public rowSelectionChange(row: Row, checked: boolean) {
    if (row) {
      if (checked) {
        this._selectRow(row);
        this.openDialog();
      } else {
        if (this._selectedAll) {
          this._selectedAll = false;
        }

        this._deselectRow(row);
      }
    }

    this._updateSelectionRefSelected();
    this._updateSelectedVisibleStatus();
  }

  /**
   * Do check or uncheck of visible rows
   *
   * @param checked
   */
  public selectAllVisibleRows(checked) {
    this.openDialog();

    this._selectedAllVisible = checked;
    this._selectedRecords = 0;

    const rows = this._getRows();

    if (checked) {
      rows.forEach((row) => {
        const identifier = this._rowIdentifier(row.data);

        if (row.isGroup) {
          this._setNumberOfSelectedChildrenInGroup(identifier, row.children.length);
        } else {
          this.selectedRows.set(identifier, row.data);
          this._selectedRecords++;
        }
      });
    } else {
      rows.forEach((row) => {
        const identifier = this._rowIdentifier(row.data);

        if (row.isGroup) {
          this._setNumberOfSelectedChildrenInGroup(identifier, 0);
        } else {
          this.selectedRows.delete(identifier);
        }
      });

      this._selectedAll = false;
      this._selectedRecords = 0;
    }

    // Fire an event that all visible selection was changed
    this._visibleRowsSelectionChanged();
    this._updateSelectionRefSelected();
  }

  public isRowSelected(rowData) {
    return this.selectedRows.has(this._rowIdentifier(rowData))
      || this.selectedGroups.has(this._rowIdentifier(rowData))
      || this.selectedAll;
  }

  public isGroupSelected(row): boolean | 'indeterminate' {
    const identifier = this._rowIdentifier(row.data);

    if (
      this.selectedGroups.has(identifier)
      && row.children?.length > this.selectedGroups.get(identifier)
    ) {
      return 'indeterminate';
    }

    return this.selectedGroups.has(identifier) || this.selectedAll;

  }

  /**
   * Open selection dialog and create reference
   */
  public openDialog() {
    if (!this._selectionDialogRef) {
      this._selectionDialogRef = this._selectionDialog.open({
        selectAll: this.selectAll,
        allCount: this._totalRecordsCount,
        actions: [...this.actions],
        // selectAll: this.sele
      });

      this._subscribeToSelection();
    }
  }

  /**
   * Update count of visible elements
   *
   * @param count
   */
  public updateVisibleRecordsCount(count: number) {
    this._visibleRecordsCount = count;
  }

  /**
   * Update count of total available elemenets
   *
   * @param count
   */
  public updateTotalRecordsCount(count: number) {
    this._totalRecordsCount = count;

    if (this._selectionDialogRef) {
      this._selectionDialogRef.updateAllCount(this._totalRecordsCount);
    }
  }

  public pageChanged() {
    if (this._selectedAll) {
      this._resetSelection();
    } else {
      this._selectedRecords = 0;
      this._getRows()
        .map((row) => row.data)
        .forEach((rowData) => {
          const identified = this._rowIdentifier(rowData);

          if (this.selectedRows.has(identified)) {
            this._selectedRecords++;
          }
        });

      this._updateSelectionRefSelected();
      this._updateSelectedVisibleStatus();
    }
  }

  public enableSelection() {
    this._disabled$.next(false);
  }

  public disableSelection() {
    this._disabled$.next(true);
  }

  /**
   * Method will be called from List for remove row if it was selected
   *
   * BUT methods for update visible and etc. will be called a bit later
   *
   * @param row
   */
  public removeRow(row) {
    this.selectedRows.delete(this._rowIdentifier(row));

    this._updateSelectionRefSelected();
    this._updateSelectionRefSelectedAll();
  }

  /**
   * Intersection of selected and passed rows to remove rows that we dont need more
   *
   * @param rows
   */
  public selectedRowsIntersection(rows) {
    const rowsIndentifiers = rows.map((row) => this._rowIdentifier(row));

    this.selectedRows.forEach((selectedRow, identifier) => {
      if (rowsIndentifiers.indexOf(identifier) === -1) {
        this.removeRow(selectedRow);
      }
    });
  }

  public updateConfig({
    actions, actionSelected, allSelected, cancelled, selectionChanged, selectAll,
  }: FsListSelectionConfig) {
    this.actions = actions ? [...actions] : this.actions;
    this.actionSelectedFn = actionSelected ?? this.actionSelectedFn;
    this.allSelectedFn = allSelected ?? this.allSelectedFn;
    this.cancelledFn = cancelled ?? this.cancelledFn;
    this.selectionChangedFn = selectionChanged ?? this.selectionChangedFn;
    this.selectAll = selectAll ?? this.selectAll;
  }

  // Reset actions to default set
  public resetActions() {
    this._selectionDialogRef?.resetActions();
  }

  public closeSelectionDialog() {
    this._selectionDialogRef?.close();
  }

  public destroy() {
    this._resetSelection();

    this.actions = null;
    this.actionSelectedFn = null;
    this.allSelectedFn = null;
    this.cancelledFn = null;

    this.closeSelectionDialog();
    this._selectionDialogRef = null;

    this._destroy$.next(null);
    this._destroy$.complete();

    this._selectionChange.complete();
  }

  /**
   * Subscribe to selectionRef events
   */
  private _subscribeToSelection() {
    this._selectionDialogRef.actionSelected$()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((data) => {
        this._onActionActions(data);
      });

    this._selectionDialogRef.destroy$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => this._onCancelActions());

    this._selectionDialogRef.allSelected$()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((data) => {
        this._onSelectAllActions(data);
      });
  }

  /**
   * If some action was clicked on selection ref dialog
   *
   * @param data
   */
  private _onActionActions(data) {
    if (!this.actionSelectedFn) {
      return;
    }

    // Execute callback
    const result = this.actionSelectedFn({
      selected: Array.from(this.selectedRows.values()).map((row) => {
        return { ...row };
      }),
      ...data,
    });

    // If result is observable
    if (result instanceof Observable) {

      // Subscribe and whait why it resolved
      result.pipe(
        take(1),
        takeUntil(this._destroy$),
      ).subscribe({
        next: () => {

          // Close dialog
          this.closeSelectionDialog();

          // Uncheck all visible rows
          this.selectAllVisibleRows(false);
        },
        error: () => { },
      });
    }
  }

  /**
   * If cancel was clicked on selection ref dialog
   */
  private _onCancelActions() {
    this.selectAllVisibleRows(false);

    if (this.cancelledFn) {
      this.cancelledFn();
    }

    this._selectionDialogRef = null;
  }

  /**
   * If "Select All" action was clicked on selection ref dialog
   *
   * @param flag
   */
  private _onSelectAllActions(flag) {
    this._selectedAll = flag;

    this.selectAllVisibleRows(flag);

    this._selectionDialogRef.updateSelected(this._totalRecordsCount);

    this._selectionChangeEvent(SelectionChangeType.SelectedAll, this._selectedAll);
    this._updateSelectionRefSelectedAll();

    if (!this.allSelectedFn) {
      return;
    }

    this.allSelectedFn(flag);
  }

  private _selectionChangedActions() {
    // Remove actions if no rows selected
    // otherwise it will "blink" when user select any action
    if (this.selectedRows.size === 0) {
      this._selectionDialogRef.updateActions([]);

      return;
    }

    if (this.selectionChangedFn) {
      const result = this.selectionChangedFn(
        Array.from(this.selectedRows.values()),
        this.selectedAll,
        this._selectionDialogRef,
      );

      if (result) {
        if (result instanceof Observable) {
          result.pipe(
            take(1),
            takeUntil(this._destroy$),
          ).subscribe({
            next: (actions) => {
              this._selectionDialogRef.updateActions(actions);
            },
          });
        } else if (Array.isArray(result)) {
          this._selectionDialogRef.updateActions(result);
        }
      }
    }
  }

  /**
   * Update in Dialog Ref how much rows was selected
   */
  private _updateSelectionRefSelected() {
    if (this._selectionDialogRef) {
      this._selectionDialogRef.updateSelected(this.selectedRows.size);

      // S-T1268
      if (this.selectedRows.size === 0) {
        this._selectionDialogRef.close();
      }

      this._selectionChangedActions();
    }
  }

  /**
   * Update in Dialog Ref selected all status
   *
   * Ex.: Was clicked "Select All" in Dialog and after that some checkbox was unchecked
   * Dialog Ref must know about it
   *
   */
  private _updateSelectionRefSelectedAll() {
    if (this._selectionDialogRef) {
      this._selectionDialogRef.updateSelectedAllStatus(this._selectedAll);
    }
  }

  /**
   * Check if all visible rows was checked and send event to main header checkbox
   */
  private _updateSelectedVisibleStatus() {
    this._selectedAllVisible = this._selectedRecords !== 0 && this._selectedRecords === this._visibleRecordsCount;

    this._selectionChangeEvent(
      SelectionChangeType.RowSelectionChange,
      this._selectedAllVisible,
    );
  }

  /**
   * If select all checkbox in header was changed
   */
  private _visibleRowsSelectionChanged() {
    this._selectionChangeEvent(
      SelectionChangeType.AllVisibleSelectionChange,
      this._selectedAllVisible,
    );
  }

  /**
   * Method constructor for events
   *
   * @param type
   * @param payload
   */
  private _selectionChangeEvent(type: SelectionChangeType, payload) {
    this._selectionChange.next({
      type,
      payload,
    });
  }

  /**
   * Get row identified by trackBy path
   *
   * @param row
   */
  private _rowIdentifier(row) {
    const identifier = _get(row, this._trackBy, undefined);

    if (identifier === undefined) {
      console.warn('Selection can not recognize track by field for row. ' +
        'Please check if you had configured trackBy function.');
    }

    return identifier;
  }

  private _selectRow(row) {
    const identifier = this._rowIdentifier(row.data);

    if (row.isGroup) {
      row.children.forEach((childRow) => {
        this._selectRow(childRow);
      });
    } else {
      if (row.isChild) {
        this._selectChildRow(row);
      }

      this.selectedRows.set(identifier, row.data);
      this._selectedRecords++;
    }
  }

  private _deselectRow(row) {
    const identifier = this._rowIdentifier(row.data);

    if (row.isGroup) {
      this.selectedGroups.delete(identifier);

      row.children.forEach((childRow) => {
        this._deselectRow(childRow);
      });
    } else {
      if (row.isChild && this.selectedRows.has(identifier)) {
        this._deselectChildRow(row);
      }

      this.selectedRows.delete(identifier);
      this._selectedRecords--;
    }
  }

  private _selectChildRow(row) {
    const parentIdentifier = this._rowIdentifier(row.parent.data);
    const selectedChildrenNumber = this.selectedGroups.get(parentIdentifier) || 0;

    this._setNumberOfSelectedChildrenInGroup(parentIdentifier, selectedChildrenNumber + 1);
  }

  private _deselectChildRow(row) {
    const parentIdentifier = this._rowIdentifier(row.parent.data);
    const selectedChildrenNumber = this.selectedGroups.get(parentIdentifier) || 0;

    if (selectedChildrenNumber > 1) {
      this._setNumberOfSelectedChildrenInGroup(parentIdentifier, selectedChildrenNumber - 1);
    } else {
      this._setNumberOfSelectedChildrenInGroup(parentIdentifier, 0);
    }
  }

  private _setNumberOfSelectedChildrenInGroup(identifier: string, n: number) {
    if (n === 0) {
      this.selectedGroups.delete(identifier);

      return;
    }

    this.selectedGroups.set(identifier, n);
  }

  /**
   * Reset selection
   */
  private _resetSelection() {
    this._selectedAll = false;
    this._selectedAllVisible = false;
    this._visibleRecordsCount = 0;
    this._selectedRecords = 0;
    this.selectedRows.clear();

    this._updateSelectionRefSelected();
    this._updateSelectionRefSelectedAll();
    this._visibleRowsSelectionChanged();
  }
}
