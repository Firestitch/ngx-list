import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ReorderController } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';

import { Row } from '../../models/row';
import { FsListDraggableListDirective } from '../draggable-list/draggable-list.directive';


@Directive({
  selector: '[fsListDraggableRow]',
})
export class FsListDraggableRowDirective implements OnInit, OnDestroy {

  @Input()
  public row: Row;
  @Input()
  public trackBy: string;

  @Input('selection')
  private _selection: SelectionController;

  private _destroy$ = new Subject<void>();

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _reorderController: ReorderController,
    private _draggableList: FsListDraggableListDirective,
  ) {}

  public ngOnInit(): void {
    this._listenDragEvents();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _listenDragEvents() {
    this._draggableList
      .dragStart$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((row: Row) => {
        if (this._reorderController.multiple) {
          const dragRowSelected = row && this._selection.isRowSelected(row.data);

          if (dragRowSelected) {
            const isSelected = this.row && this._selection.isRowSelected(this.row.data);
            if (isSelected && row.data[this.trackBy] !== this.row.data[this.trackBy]) {
              // TODO
              this._el.nativeElement.classList.add('drag-hidden');
              setTimeout(() => {
                this._el.nativeElement.style.display = 'none';
              }, 200);
            }
          }
        }


        if (this._reorderController.moveDropCallback) {
          this._markReadyToSwapRows();
        }
      });

    this._draggableList
      .dragEnd$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._el.nativeElement.classList.remove('drag-hidden');
        setTimeout(() => {
          this._el.nativeElement.style.display = 'table-row';
        }, 201);

        if (this._reorderController.moveDropCallback) {
          this._unmarkRows();
        }
      });
  }

  private _markReadyToSwapRows() {
    const currentEl = this.row;
    const targetEl = this._draggableList.draggableItem;

    const currentElGroup = (currentEl.isChild && currentEl.parent) || currentEl;
    const targetElGroup = (targetEl.isChild && targetEl.parent) || targetEl;

    this.row.readyToSwap = this._reorderController.moveDropCallback(
      {
        row1: currentEl?.data,
        row2: targetEl?.data,
        group1: currentEl?.parent?.data,
        group2: targetEl?.parent?.data
      },
    );

    if (!this.row.readyToSwap) {
      this._renderer.addClass(this._el.nativeElement, 'fs-list-swap-restricted');
    }
  }

  private _unmarkRows() {
    if (!this.row.readyToSwap) {
      this._renderer.removeClass(this._el.nativeElement, 'fs-list-swap-restricted');
    }
  }
}
