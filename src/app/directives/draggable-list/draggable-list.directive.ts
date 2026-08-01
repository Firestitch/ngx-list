import { ChangeDetectorRef, Directive, ElementRef, Input, NgZone, OnDestroy, Renderer2, inject } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { BreakpointController } from '../../classes/breakpoint-controller';
import { ReorderController, ReorderStrategy } from '../../classes/reorder-controller';
import { FsListDragChildRowElement } from '../../interfaces/draggable-list.interface';
import { Row, isChildRow, isGroupRow } from '../../models/row';
import { FsListDraggableRowDirective } from '../draggable-row/draggable-row.directive';


@Directive({
  selector: '[fsListDraggableList]',
  standalone: true,
})
export class FsListDraggableListDirective implements OnDestroy {

  private _cdRef = inject(ChangeDetectorRef);
  private _zone = inject(NgZone);
  private _containerElement = inject(ElementRef);
  private _reorderController = inject(ReorderController);
  private _renderer = inject(Renderer2);
  private _breakpoints = inject(BreakpointController, { optional: true });

  // Draggable Element
  private _draggableElement: HTMLElement;
  private _draggableElementPreview: HTMLElement;
  private _multipleDraggableElementPreview: HTMLElement;
  private _draggableElementHeight: number;
  private _draggableElementIndex: number;
  private _draggableElementStartIndex: number;

  // Snapshotted at drag start next to the row dims, so the clamp and the hit-test always
  // describe the same frozen layout.
  private _containerBounds: DOMRect;

  // Handlers
  private _dragToHandler = this.dragTo.bind(this);
  private _dragEndHandler = this.dragEnd.bind(this);

  private _dragInProgress = false;

  private _childRowElements: FsListDragChildRowElement[];
  private _dragStart$ = new Subject<void>();
  private _dragEnd$ = new Subject<void>();

  /**
   * A reload that swaps the array out from under an in-flight drag leaves the frozen geometry
   * cache describing rows that no longer exist -- the hit-test then indexes past the end of
   * `_rows`. Drop the drag instead of dragging against a stale snapshot. Safe because
   * `swapWithIndex()` mutates the array in place, so its identity is stable within a drag.
   */
  @Input('rows')
  public set rows(value: Row[]) {
    if (this._rows && value !== this._rows) {
      this._cleanupDrag();
    }

    this._rows = value;
  }

  private _rows: Row[];
  private _draggableChildrenDirectives: FsListDraggableRowDirective[] = [];
  private _selectedRowsDirectives: FsListDraggableRowDirective[] = [];
  private _destroy$ = new Subject();

  private _windowTouchMoveHandler = () => {
    //
  };

  public get dragStart$(): Observable<void> {
    return this._dragStart$.pipe(takeUntil(this._destroy$));
  }

  public get dragEnd$(): Observable<void> {
    return this._dragEnd$.pipe(takeUntil(this._destroy$));
  }

  public get draggableItem(): Row {
    return this._rows[this._draggableElementIndex];
  }
  public addDraggableDirective(dir: FsListDraggableRowDirective): void {
    this._draggableChildrenDirectives.push(dir);
  }

  public removeDraggableDirective(dir: FsListDraggableRowDirective): void {
    const idx = this._draggableChildrenDirectives.indexOf(dir);

    if (idx !== -1) {
      this._draggableChildrenDirectives.splice(idx, 1);
    }
  }

  /**
   * Prepare draggable elements and add events
   *
   * @param draggableElement
   */
  public dragStart(draggableElement: HTMLElement) {
    if (this._dragInProgress) {
      return;
    }

    if (
      this._reorderController.startCallback
      && this._reorderController.strategy === ReorderStrategy.Always
    ) {
      this._reorderController.startCallback();
    }

    this._dragInProgress = true;

    // Row top/height are snapshotted once here and hit-tested against for the whole drag,
    // with no invalidation path -- a breakpoint swap mid-drag would reflow the table and
    // silently produce the wrong drop target. Held, not dropped: the swap applies on drop.
    this._breakpoints?.suspend();

    window.document.body.classList.add('reorder-in-progress');

    this._draggableElement = draggableElement;

    this._detectSelectedRows();
    this.prepareElements();
    this.initDraggableElement();

    this._draggableElementStartIndex = this._draggableElementIndex;
    this._draggableElement.classList.add('draggable-elem');

    this._zone.runOutsideAngular(() => {
      window.addEventListener('touchmove', this._windowTouchMoveHandler, { passive: true });
      window.document.addEventListener('mousemove', this._dragToHandler, { passive: true });
      window.document.addEventListener('touchmove', this._dragToHandler, { passive: false });
    });

    window.document.addEventListener('mouseup', this._dragEndHandler);
    window.document.addEventListener('touchend', this._dragEndHandler);
    window.document.addEventListener('touchcancel', this._dragEndHandler);

    this._dragStart$.next(null);
  }


  /**
   * Move draggable elements and swap items
   *
   * @param event
   */
  public dragTo(event) {
    this.touchFix(event);
    const elemIndex = this.lookupElementUnder(event);
    const targetRow = this._rows[elemIndex];

    if (this._multipleDraggableElementPreview) {
      this._multipleDraggableElementPreview.style.left = `${event.clientX}px`;
      this._multipleDraggableElementPreview.style.top = `${this._clampPreviewTop(event.clientY, 0)}px`;
    }

    // Can not drag before first group and after last group
    const swapWithBoundaryGroupElement =
      (elemIndex === 0 || elemIndex === this._rows.length - 1)
      && isGroupRow(targetRow)
      // TODO fix isChild & all
      && (isChildRow(this.draggableItem));


    if (!swapWithBoundaryGroupElement) {
      if (elemIndex !== null) {
        if (targetRow.readyToSwap) {
          this.swapWithIndex(elemIndex);
          if (this._draggableElementPreview) {
            this._draggableElementPreview.classList.remove('fs-list-no-drop');
          }
        } else {
          if (this._draggableElementPreview) {
            this._draggableElementPreview.classList.add('fs-list-no-drop');
          }
        }
      }

      if (this._draggableElementPreview) {
        const topOffset = this._clampPreviewTop(
          event.y || event.clientY,
          this._draggableElementHeight ?? 0,
        );

        this._draggableElementPreview.style.top = `${topOffset}px`;
      }
    }
  }

  /**
   * Finish the drag: tear the drag down first, then tell the consumer.
   *
   * Teardown must never sit downstream of the consumer callbacks. `doneCallback` runs inside
   * `_zone.run()`, which re-throws synchronously, so a consumer that threw used to abort the rest
   * of this method -- leaving the cloned preview in the DOM and the document `mousemove` listener
   * attached, i.e. a row that follows the cursor forever and can only be cleared by a refresh.
   *
   * Nothing after `_cleanupDrag()` reads drag state: `finishReorder()` and both callbacks work off
   * the data controller alone. The one value that does -- whether the row actually moved -- is
   * snapshotted first.
   */
  public dragEnd() {
    // On touch, `touchend` and the compatibility `mouseup` both fire. Without this the second
    // pass tears down state that is already null.
    if (!this._dragInProgress) {
      return;
    }

    const moved = this._draggableElementStartIndex !== this._draggableElementIndex;

    this._cleanupDrag();

    this._reorderController.dataController.finishReorder();

    if (this._reorderController.movedCallback && moved) {
      this._reorderController.movedCallback(
        this._reorderController.dataController.reorderData,
      );
    }

    // There is no drag threshold, so a bare click on the handle opens and closes a drag. Only
    // report a reorder the user actually performed.
    if (moved && this._reorderController.strategy === ReorderStrategy.Always) {
      this._zone.run(() => {
        if (this._reorderController.doneCallback) {
          const result = this._reorderController.doneCallback(
            this._reorderController.dataController.reorderData,
          );

          this._waitUntilIsNotDone(result);
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this._cleanupDrag();

    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private get _isMultipleDrag(): boolean {
    return this._reorderController.multiple && this._selectedRowsDirectives.length > 1;
  }


  /**
   * looking row elements and save their dims
   */
  private prepareElements() {
    this._containerBounds = this._containerElement.nativeElement.getBoundingClientRect();
    this.lookupChildElements();
    this.calcElementsDimensions();
  }

  /**
   * Store child rows
   */
  private lookupChildElements() {
    this._childRowElements = Array.from(this._containerElement.nativeElement.querySelectorAll('tr:not(.drag-hidden)'))
      .reduce((acc: any[], rowElement, index) => {
        const element: any = { target: rowElement };

        if (rowElement === this._draggableElement) {
          this._draggableElementIndex = index;
          element.active = true;
        }

        acc.push(element);

        return acc;
      }, []) as FsListDragChildRowElement[];
  }

  /**
   * Calc child rows sizes/offsets
   */
  private calcElementsDimensions() {
    this._childRowElements.forEach((el: any, index) => {
      const dims = el.target.getBoundingClientRect();
      el.top = dims.top;
      el.height = dims.height;
      el.center = dims.top + (dims.height / 2);
      el.index = index;
    });
  }

  /**
   * Init draggable element
   */
  private initDraggableElement() {
    const el = this._draggableElement.cloneNode(true) as HTMLElement;
    const data = this._draggableElement.getBoundingClientRect();

    if (!(this._isMultipleDrag)) {
      el.style.width = `${data.width}px`;
      el.style.left = `${data.left}px`;
      el.style.top = `${data.top}px`;
      el.classList.add('draggable');

      this._containerElement.nativeElement.append(el);

      this._draggableElementPreview = el;
      this._draggableElementHeight = data.height;

      this.updateDraggableDims();
    } else {
      // Create preview DIV
      this._containerElement.nativeElement.classList.add('drag-hidden');

      const selectedCount = this._selectedRowsDirectives?.length;
      const previewBlock = this._renderer.createElement('div');
      previewBlock.style.left = `${data.left}px`;
      previewBlock.style.top = `${data.top}px`;

      const text = this._renderer.createText(`${selectedCount} selected items`);

      this._renderer.appendChild(previewBlock, text);
      this._renderer.addClass(previewBlock, 'fs-list-preview-block');
      this._renderer.appendChild(document.body, previewBlock);
      this._multipleDraggableElementPreview = previewBlock;
    }

  }

  /**
   * Looking by stored row elements for overlapped row
   *
   * @param event
   */
  private lookupElementUnder(event) {
    const top = event.y || event.clientY;
    const bottom = event.y || event.clientY;
    let elemIndex = null;

    for (let i = 0; i < this._childRowElements.length; i++) {
      const el = this._childRowElements[i];

      if (!el.active) {
        if (top < el.center + (el.height / 2) && el.index < this._draggableElementIndex
          || bottom > el.center - (el.height / 2) && el.index > this._draggableElementIndex) {
          elemIndex = i;
        }
      }
    }

    return elemIndex;
  }

  /**
   * Swap rows
   *
   * @param index
   */
  private swapWithIndex(index) {
    const activeIndex = this._draggableElementIndex;
    const selectedRows = this._selectedRowsDirectives
      .map((d) => d.row)
      .filter((d) => d.readyToSwap);

    // Swap rows in global rows stack
    this._reorderController
      .dataController
      .swapRows(
        this._rows[activeIndex],
        this._rows[index],
        selectedRows,
        this._isMultipleDrag,
      );

    // Swap visible rows
    if (!this._isMultipleDrag) {
      const activeRow = this._rows[activeIndex];
      this._rows[activeIndex] = this._rows[index];
      this._rows[index] = activeRow;

      const activeElement = this._childRowElements[activeIndex].target;
      this._childRowElements[activeIndex].active = false;

      this._childRowElements[activeIndex].target = this._childRowElements[index].target;
      this._childRowElements[index].target = activeElement;
      this._childRowElements[index].active = true;
    }

    this._draggableElementIndex = index;
    this._cdRef.detectChanges();
  }

  /**
   * Update cell width for draggable elem
   */
  private updateDraggableDims() {
    const draggableCells: any = Array.from(this._draggableElementPreview.querySelectorAll('td'));

    Array.from(
      this._draggableElementPreview.querySelectorAll('td'),
    ).forEach((elem: any, index) => {
      const dims = elem.getBoundingClientRect();
      draggableCells[index].style.width = `${dims.width}px`;
    });
  }

  /**
   * Drop every trace of the in-flight drag: document listeners first, so nothing can re-enter
   * mid-teardown, then the DOM classes and the preview clone. Safe to call when no drag is
   * running, and deliberately free of consumer callbacks so it can never be skipped by one.
   */
  private _cleanupDrag(): void {
    if (!this._dragInProgress) {
      return;
    }

    this._dragInProgress = false;

    this._removeDragListeners();
    this._breakpoints?.resume();

    this._containerElement.nativeElement.classList.remove('drag-hidden');
    window.document.body.classList.remove('reorder-in-progress');
    this._draggableElement?.classList.remove('draggable-elem');
    this._draggableElement = null;

    this._removeDragPreviews();

    this._draggableElementHeight = null;
    this._draggableElementIndex = null;
    this._draggableElementStartIndex = null;
    this._containerBounds = null;
    this._selectedRowsDirectives = [];

    this._dragEnd$.next(null);
  }

  /**
   * Independent checks, not if/else: a single drag creates only the cloned row, a multiple drag
   * only the preview block, and a drag torn down early may have neither. The old if/else fed a
   * null into Renderer2.removeChild(), which is `oldChild.remove()` and throws.
   */
  private _removeDragPreviews(): void {
    if (this._draggableElementPreview) {
      this._draggableElementPreview.remove();
      this._draggableElementPreview = null;
    }

    if (this._multipleDraggableElementPreview) {
      this._renderer.removeChild(document.body, this._multipleDraggableElementPreview);
      this._multipleDraggableElementPreview = null;
    }
  }

  /**
   * Detach everything `dragStart()` bound to the document. Called first during teardown so no
   * pointer event can re-enter the drag while its state is half-released.
   */
  private _removeDragListeners(): void {
    window.removeEventListener('touchmove', this._windowTouchMoveHandler);
    window.document.removeEventListener('mousemove', this._dragToHandler);
    window.document.removeEventListener('touchmove', this._dragToHandler);
    window.document.removeEventListener('mouseup', this._dragEndHandler);
    window.document.removeEventListener('touchend', this._dragEndHandler);
    window.document.removeEventListener('touchcancel', this._dragEndHandler);
  }

  /**
   * Keep the preview inside the list. Unclamped it follows the pointer anywhere on the page --
   * over the app header, out of a dialog -- which reads as a row that escaped and cannot be
   * dropped.
   */
  private _clampPreviewTop(pointerY: number, height: number): number {
    const top = pointerY - (height / 2);
    const bounds = this._containerBounds;

    if (!bounds) {
      return top;
    }

    return Math.min(
      Math.max(top, bounds.top),
      Math.max(bounds.top, bounds.bottom - height),
    );
  }

  private _waitUntilIsNotDone(doneResult: unknown): void {
    if (doneResult instanceof Observable) {
      this._reorderController.disableReorderAction();

      doneResult
        .pipe(
          // finalize, not the next handler: a done callback that errors would otherwise leave
          // the reorder action disabled for good.
          finalize(() => {
            this._reorderController.enableReorderAction();
          }),
          takeUntil(this._destroy$),
        )
        .subscribe();
    }
  }

  private _detectSelectedRows(): void {
    this._draggableChildrenDirectives
      .forEach((dir: FsListDraggableRowDirective) => {
        const isRowSelected = this._reorderController.selectionController?.isRowSelected(dir.row.data);

        if (isRowSelected && !isGroupRow(dir.row)) {
          this._selectedRowsDirectives.push(dir);
        }
      });
  }

  /**
   * Fix background when mobile
   *
   * @param e
   */
  private touchFix(e) {
    if (!('clientX' in e) && !('clientY' in e)) {
      const touches = e.touches || e.originalEvent.touches;
      if (touches && touches.length) {
        e.clientX = touches[0].clientX;
        e.clientY = touches[0].clientY;
      }

      e.preventDefault();
    }
  }
}
