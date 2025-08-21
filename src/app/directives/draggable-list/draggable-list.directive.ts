import { ChangeDetectorRef, Directive, ElementRef, Input, NgZone, Renderer2 } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ReorderController, ReorderStrategy } from '../../classes/reorder-controller';
import { FsListDragChildRowElement } from '../../interfaces/draggable-list.interface';
import { Row } from '../../models/row';
import { FsListDraggableRowDirective } from '../draggable-row/draggable-row.directive';


@Directive({
    selector: '[fsListDraggableList]',
    standalone: true,
})
export class FsListDraggableListDirective {
  // Draggable Element
  private _draggableElement: HTMLElement;
  private _draggableElementPreview: HTMLElement;
  private _multipleDraggableElementPreview: HTMLElement;
  private _draggableElementHeight: number;
  private _draggableElementIndex: number;
  private _draggableElementStartIndex: number;

  // Handlers
  private _dragToHandler = this.dragTo.bind(this);
  private _dragEndHandler = this.dragEnd.bind(this);

  private _dragInProgress = false;

  private _childRowElements: FsListDragChildRowElement[];
  private _dragStart$ = new Subject<void>();
  private _dragEnd$ = new Subject<void>();

  @Input('rows')
  private _rows: Row[];
  private _draggableChildrenDirectives: FsListDraggableRowDirective[] = [];
  private _selectedRowsDirectives: FsListDraggableRowDirective[] = [];
  private _destroy$ = new Subject();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _zone: NgZone,
    private _containerElement: ElementRef,
    private _reorderController: ReorderController,
    private _renderer: Renderer2,
  ) { }
  
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
      this._multipleDraggableElementPreview.style.top = `${event.clientY}px`;
    }

    // Can not drag before first group and after last group
    const swapWithBoundaryGroupElement =
      (elemIndex === 0 || elemIndex === this._rows.length - 1)
      && targetRow.isGroup
      // TODO fix isChild & all
      && (this.draggableItem as any).isChild;


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

      // FIXME
      if (this._draggableElementPreview) {
        const topOffset = (event.y || event.clientY) - (this._draggableElementHeight / 2);
        this._draggableElementPreview.style.top = `${topOffset}px`;
      }
    }
  }

  /**
   * Remove events and classes after drag finish
   */
  public dragEnd() {
    this._dragInProgress = false;
    this._reorderController.dataController.finishReorder();

    if (this._reorderController.movedCallback
      && this._draggableElementStartIndex !== this._draggableElementIndex) {

      this._reorderController.movedCallback(
        this._reorderController.dataController.reorderData,
      );
    }

    if (this._reorderController.strategy === ReorderStrategy.Always) {
      this._zone.run(() => {
        if (this._reorderController.doneCallback) {
          const result = this._reorderController.doneCallback(
            this._reorderController.dataController.reorderData,
          );

          this._waitUntilIsNotDone(result);
        }
      });
    }

    // this._reorderController.dataController.updateOrderByRows(this._rows);
    ///
    this._containerElement.nativeElement.classList.remove('drag-hidden');
    this._draggableElement.classList.remove('draggable-elem');
    window.document.body.classList.remove('reorder-in-progress');
    this._draggableElement = null;

    if (this._draggableElementPreview) {
      this._draggableElementPreview.remove();

      this._draggableElementPreview = null;
    } else {
      this._renderer.removeChild(document.body, this._multipleDraggableElementPreview);
      this._multipleDraggableElementPreview = null;
    }

    this._draggableElementHeight = null;
    this._draggableElementIndex = null;
    this._draggableElementStartIndex = null;
    this._selectedRowsDirectives = [];

    window.removeEventListener('touchmove', this._windowTouchMoveHandler);
    window.document.removeEventListener('mousemove', this._dragToHandler);
    window.document.removeEventListener('touchmove', this._dragToHandler);
    window.document.removeEventListener('mouseup', this._dragEndHandler);
    window.document.removeEventListener('touchend', this._dragEndHandler);
    window.document.removeEventListener('touchcancel', this._dragEndHandler);

    this._dragEnd$.next(null);
  }

  private get _isMultipleDrag(): boolean {
    return this._reorderController.multiple && this._selectedRowsDirectives.length > 1;
  }


  /**
   * looking row elements and save their dims
   */
  private prepareElements() {
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

  private _waitUntilIsNotDone(doneResult: unknown): void {
    if (doneResult instanceof Observable) {
      this._reorderController.disableReorderAction();

      doneResult
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._reorderController.enableReorderAction();
        });
    }
  }

  private _detectSelectedRows(): void {
    this._draggableChildrenDirectives
      .forEach((dir: FsListDraggableRowDirective) => {
        const isRowSelected = this._reorderController.selectionController?.isRowSelected(dir.row.data);

        if (isRowSelected && !dir.row.isGroup) {
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
