import { Observable, Subject } from 'rxjs';
import { SelectionDialog, SelectionRef } from '@firestitch/selection';

import { FsListSelectionConfig } from '../interfaces';
import { take, takeUntil } from 'rxjs/operators';


export enum SelectionChangeType {
  visibleRowsSelectionChanged = 1,
  rowSelected = 2,
  selectedAll = 3,
}


export class Selection {

  // Options from passed config
  public actions = [];
  public onActionFn;
  public onSelectAllFn;
  public onCancelFn;

  // Store for selected visible rows
  public selectedRows = new Set();

  // Reference to selection dialog
  public selectionDialogRef: SelectionRef = null;

  private _selectionChange = new Subject<{ type: SelectionChangeType, payload: any }>();

  // Selected only visible rows (ex.: selected only limited 15 rows when we have pagination)
  private _selectedAllVisible = false;

  // Selected all rows when was clicked "Select All" in selection dialog
  // or count of visible records is equal to total and all visible rows was selected
  private _selectedAll = false;

  private _visibleRecordsCount = 0;
  private _totalRecordsCount = 0;

  private _onDestroy = new Subject();

  constructor(config: FsListSelectionConfig = {}, private _selectionDialog: SelectionDialog) {
    this.actions = config.actions ? [...config.actions] : [];
    this.onActionFn = config.onAction;
    this.onSelectAllFn = config.onSelectAll;
    this.onCancelFn = config.onCancel;
  }

  get selectionChange$() {
    return this._selectionChange.pipe(takeUntil(this._onDestroy));
  }

  /**
   * Trigger when row was selected
   * @param row
   * @param checked
   */
  public rowSelectionChange(row, checked) {
    if (checked) {
      this.selectedRows.add(row);
      this.openDialog();
    } else {
      this.selectedRows.delete(row);
    }

    // Do update of _selectedAllVisible flag
    this._updateSelectedAllStatus();

    // When selectedAll in selectionDialogRef must be shown 'all' instead of number of selected
    if (this._selectedAll) {
      const allVisibleSelected = this._visibleRecordsCount === this.selectedRows.size;

      this._updateSelectionRefSelectedAll(allVisibleSelected);

      // In case when we need to show number of selected instead of 'all'
      if (!allVisibleSelected) {
        this._updateSelectionRefSelected();
      }
    } else {
      this._updateSelectionRefSelected();
    }
  }

  /**
   * Do check or uncheck of visible rows
   * @param checked
   */
  public selectAllVisibleRows(checked) {
    this._selectedAllVisible = checked;

    // Fire an event that all visible selection was changed
    this._visibleRowsSelectionChanged();

    if (!checked) {
      this.selectedRows.clear();
    } else {
      this.openDialog();
    }
  }

  /**
   * Open selection dialog and create reference
   */
  public openDialog() {
    if (!this.selectionDialogRef) {
      this.selectionDialogRef = this._selectionDialog.open({
        allCount: this._totalRecordsCount,
        actions: [...this.actions],
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

    // this._updateSelectionStatus();
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

  public destroy() {
    this.selectedRows.clear();
    this.actions = null;
    this.onActionFn = null;
    this.onSelectAllFn = null;
    this.onCancelFn = null;

    if (this.selectionDialogRef) {
      this.selectionDialogRef.close();
    }
    this.selectionDialogRef = null;

    this._onDestroy.next();
    this._onDestroy.complete();

    this._selectionChange.complete();
  }

  /**
   * Subscribe to selectionRef events
   * @private
   */
  private _subscribeToSelection() {
    if (this.onActionFn) {
      this.selectionDialogRef.onAction()
        .subscribe((data) => this._onActionActions(data));
    }

    this.selectionDialogRef.onCancel()
      .subscribe(() => this._onCancelActions());

    if (this.onSelectAllFn) {
      this.selectionDialogRef.onSelectAll()
        .subscribe((data) => this._onSelectAllActions(data))
    }
  }

  /**
   * If some action was clicked on selection ref dialog
   * @param data
   * @private
   */
  private _onActionActions(data) {
    // Execute callback
    const result = this.onActionFn({
      selectedRows: Array.from(this.selectedRows).map((row) => { return {...row}}),
      ...data
    });

    // If result is observable
    if (result instanceof Observable) {

      // Subscribe and whait why it resolved
      result.pipe(
        take(1),
      ).subscribe(() => {

        // Close dialog
        if (this.selectionDialogRef) {
          this.selectionDialogRef.close();
        }

        // Uncheck all visible rows
        this.selectAllVisibleRows(false);
      });
    }
  }

  /**
   * If cancel was clicked on selection ref dialog
   * @private
   */
  private _onCancelActions() {
    this.selectAllVisibleRows(false);

    if (this.onCancelFn) {
      this.onCancelFn();
    }

    this.selectionDialogRef = null;
  }

  /**
   * If "Select All" action was clicked on selection ref dialog
   * @param data
   * @private
   */
  private _onSelectAllActions(data) {
    this._selectedAll = data;

    this._selectionChangeEvent(SelectionChangeType.selectedAll, this._selectedAll);

    this.onSelectAllFn(data);
  }

  /**
   * Update in Dialog Ref how much rows was selected
   * @private
   */
  private _updateSelectionRefSelected() {
    if (this.selectionDialogRef) {
      this.selectionDialogRef.updateSelected(this.selectedRows.size);
    }
  }

  /**
   * Update in Dialog Ref selected all status
   *
   * Ex.: Was clicked "Select All" in Dialog and after that some checkbox was unchecked
   * Dialog Ref must know about it
   *
   * @param status
   * @private
   */
  private _updateSelectionRefSelectedAll(status: boolean) {
    if (this.selectionDialogRef) {
      this.selectionDialogRef.updateSelectedAllStatus(status);
    }
  }

  /**
   * Check if all visible rows was checked and send event to main header checkbox
   * @private
   */
  private _updateSelectedAllStatus() {
    this._selectedAllVisible = this.selectedRows.size === this._visibleRecordsCount;

    this._selectionChangeEvent(SelectionChangeType.rowSelected, this._selectedAllVisible);
  }

  /**
   * If select all checkbox in header was changed
   * @private
   */
  private _visibleRowsSelectionChanged() {
    this._selectionChangeEvent(
      SelectionChangeType.visibleRowsSelectionChanged,
      this._selectedAllVisible
    );
  }

  /**
   * Method constructor for events
   * @param type
   * @param payload
   * @private
   */
  private _selectionChangeEvent(type: SelectionChangeType, payload) {
    this._selectionChange.next({
      type: type,
      payload: payload
    });
  }
}
