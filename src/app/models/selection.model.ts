import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { get as _get } from 'lodash-es';
import { SelectionDialog, SelectionRef } from '@firestitch/selection';

import { FsListSelectionConfig } from '../interfaces';


export enum SelectionChangeType {
  AllVisibleSelectionChange = 'AllVisibleSelectionChange',
  RowSelectionChange = 'RowSelectionChange',
  SelectedAll = 'SelectedAll',
}


export class Selection {

  // Options from passed config
  public actions = [];
  public selectAll = true;
  public selectionChangedFn;
  public actionSelectedFn;
  public allSelectedFn;
  public cancelledFn;

  // Store for selected visible rows
  public selectedRows = new Map();

  // Reference to selection dialog
  public selectionDialogRef: SelectionRef = null;

  private _rowsData$: BehaviorSubject<any[]>;
  private _selectionChange = new Subject<{ type: SelectionChangeType, payload: any }>();

  // Selected only visible rows (ex.: selected only limited 15 rows when we have pagination)
  private _selectedAllVisible = false;

  // Selected all rows when was clicked "Select All" in selection dialog
  // or count of visible records is equal to total and all visible rows was selected
  private _selectedAll = false;

  private _selectedRecords = 0;
  private _visibleRecordsCount = 0;
  private _totalRecordsCount = 0;

  private _destroy$ = new Subject();

  constructor(
    config: FsListSelectionConfig = {},
    private _trackBy: string,
    private _selectionDialog: SelectionDialog
  ) {
    this.actions = config.actions ? [...config.actions] : [];
    this.actionSelectedFn = config.actionSelected;
    this.allSelectedFn = config.allSelected;
    this.cancelledFn = config.cancelled;
    this.selectionChangedFn = config.selectionChanged;
    this.selectAll = config.selectAll;
  }

  get selectedAll() {
    return this._selectedAll;
  }

  get selectionChange$() {
    return this._selectionChange.pipe(takeUntil(this._destroy$));
  }

  public setRowsData(data: BehaviorSubject<any[]>) {
    this._rowsData$ = data;
  }

  /**
   * Trigger when row was selected
   * @param row
   * @param checked
   */
  public rowSelectionChange(row, checked) {
    if (row) {
      const identifier = this._rowIdentifier(row);

      if (checked) {
        this.selectedRows.set(identifier, row);
        this._selectedRecords++;
        this.openDialog();
      } else {
        if (this._selectedAll) {
          this._selectedAll = false;
        }

        this.selectedRows.delete(identifier);
        this._selectedRecords--;
      }
    }

    this._updateSelectionRefSelected();
    this._updateSelectedVisibleStatus();
  }

  /**
   * Do check or uncheck of visible rows
   * @param checked
   */
  public selectAllVisibleRows(checked) {
    this.openDialog();

    this._selectedAllVisible = checked;

    if (checked) {
      this._rowsData$.getValue().forEach((row) => {
        const identifier = this._rowIdentifier(row);
        this.selectedRows.set(identifier, row);
      });

      this._selectedRecords = this._rowsData$.getValue().length;
    } else {
      this._rowsData$.getValue().forEach((row) => {
        const identifier = this._rowIdentifier(row);
        this.selectedRows.delete(identifier);
      });

      this._selectedAll = false;
      this._selectedRecords = 0;
    }

    // Fire an event that all visible selection was changed
    this._visibleRowsSelectionChanged();
    this._updateSelectionRefSelected();
  }

  public isRowSelected(row) {
    return this.selectedRows.has(this._rowIdentifier(row)) || this.selectedAll;
  }

  /**
   * Open selection dialog and create reference
   */
  public openDialog() {
    if (!this.selectionDialogRef) {
      this.selectionDialogRef = this._selectionDialog.open({
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
   * @param count
   */
  public updateVisibleRecordsCount(count: number) {
    this._visibleRecordsCount = count;
  }

  /**
   * Update count of total available elemenets
   * @param count
   */
  public updateTotalRecordsCount(count: number) {
    this._totalRecordsCount = count;

    if (this.selectionDialogRef) {
      this.selectionDialogRef.updateAllCount(this._totalRecordsCount);
    }
  }

  public pageChanged(infinityScrollEnabled) {
    if (this._selectedAll) {
      if (!infinityScrollEnabled) {
        this._resetSelection();
      }
    } else {
      this._selectedRecords = 0;
      this._rowsData$.getValue().forEach((row) => {
        const identified = this._rowIdentifier(row);

        if (this.selectedRows.has(identified)) {
          this._selectedRecords++;
        }
      });

      this._updateSelectionRefSelected();
      this._updateSelectedVisibleStatus();
    }
  }

  /**
   * Method will be called from List for remove row if it was selected
   *
   * BUT methods for update visible and etc. will be called a bit later
   * @param row
   */
  public removeRow(row) {
    this.selectedRows.delete(this._rowIdentifier(row));

    this._updateSelectionRefSelected();
    this._updateSelectionRefSelectedAll();
  }

  /**
   * Intersection of selected and passed rows to remove rows that we dont need more
   * @param rows
   */
  public selectedRowsIntersection(rows) {
    const rowsIndentifiers = rows.map((row) => this._rowIdentifier(row));

    this.selectedRows.forEach((selectedRow, identifier) => {
      if (rowsIndentifiers.indexOf(identifier) === -1) {
        this.removeRow(selectedRow);
      }
    })
  }

  public destroy() {
    this._resetSelection();

    this.actions = null;
    this.actionSelectedFn = null;
    this.allSelectedFn = null;
    this.cancelledFn = null;

    if (this.selectionDialogRef) {
      this.selectionDialogRef.close();
    }
    this.selectionDialogRef = null;

    this._destroy$.next();
    this._destroy$.complete();

    this._selectionChange.complete();
  }

  /**
   * Subscribe to selectionRef events
   */
  private _subscribeToSelection() {
    this.selectionDialogRef.actionSelected$()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        this._onActionActions(data);
      });

    this.selectionDialogRef.cancelled$()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(() => this._onCancelActions());

    this.selectionDialogRef.allSelected$()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        this._onSelectAllActions(data);
      })
  }

  /**
   * If some action was clicked on selection ref dialog
   * @param data
   */
  private _onActionActions(data) {
    if (!this.actionSelectedFn) { return }

    // Execute callback
    const result = this.actionSelectedFn({
      selected: Array.from(this.selectedRows.values()).map((row) => { return {...row}}),
      ...data
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
          if (this.selectionDialogRef) {
            this.selectionDialogRef.close();
          }

          // Uncheck all visible rows
          this.selectAllVisibleRows(false);
        },
        error: () => {}
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

    this.selectionDialogRef = null;
  }

  /**
   * If "Select All" action was clicked on selection ref dialog
   * @param flag
   */
  private _onSelectAllActions(flag) {
    if (!this.allSelectedFn) { return }

    this._selectedAll = flag;

    this.selectAllVisibleRows(flag);

    this.selectionDialogRef.updateSelected(this._totalRecordsCount);

    this._selectionChangeEvent(SelectionChangeType.SelectedAll, this._selectedAll);
    this._updateSelectionRefSelectedAll();

    this.allSelectedFn(flag);
  }

  private _selectionChangedActions() {
    if (this.selectionChangedFn) {
      const result = this.selectionChangedFn(
        Array.from(this.selectedRows.values()),
        this.selectedAll,
        this.selectionDialogRef,
      );

      if (result) {
        if (result instanceof Observable) {
          result.pipe(
            take(1),
            takeUntil(this._destroy$),
          ).subscribe({
            next: (actions) => {
              this.selectionDialogRef.updateActions(actions);
            }
          });
        } else if (Array.isArray(result)) {
          this.selectionDialogRef.updateActions(result);
        }
      }
    }
  }

  /**
   * Update in Dialog Ref how much rows was selected
   */
  private _updateSelectionRefSelected() {
    if (this.selectionDialogRef) {
      this.selectionDialogRef.updateSelected(this.selectedRows.size);
    }
    this._selectionChangedActions();
  }

  /**
   * Update in Dialog Ref selected all status
   *
   * Ex.: Was clicked "Select All" in Dialog and after that some checkbox was unchecked
   * Dialog Ref must know about it
   *
   */
  private _updateSelectionRefSelectedAll() {
    if (this.selectionDialogRef) {
      this.selectionDialogRef.updateSelectedAllStatus(this._selectedAll);
    }
  }

  /**
   * Check if all visible rows was checked and send event to main header checkbox
   */
  private _updateSelectedVisibleStatus() {
    this._selectedAllVisible = this._selectedRecords !== 0 && this._selectedRecords === this._visibleRecordsCount;

    this._selectionChangeEvent(
      SelectionChangeType.RowSelectionChange,
      this._selectedAllVisible
    );
  }

  /**
   * If select all checkbox in header was changed
   */
  private _visibleRowsSelectionChanged() {
    this._selectionChangeEvent(
      SelectionChangeType.AllVisibleSelectionChange,
      this._selectedAllVisible
    );
  }

  /**
   * Method constructor for events
   * @param type
   * @param payload
   */
  private _selectionChangeEvent(type: SelectionChangeType, payload) {
    this._selectionChange.next({
      type: type,
      payload: payload
    });
  }

  /**
   * Get row identified by trackBy path
   *
   * @param row
   */
  private _rowIdentifier(row) {
    return _get(row, this._trackBy)
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
