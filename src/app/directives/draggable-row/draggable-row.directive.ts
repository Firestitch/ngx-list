import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ReorderController } from '../../classes/reorder-controller';

import { Row } from '../../models/row';
import { FsListDraggableListDirective } from '../draggable-list/draggable-list.directive';


@Directive({
  selector: '[fsListDraggableRow]',
})
export class FsListDraggableRowDirective implements OnInit, OnDestroy {

  @Input()
  public row: Row;

  private _destroy$ = new Subject<void>();

  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _reorderController: ReorderController,
    private _draggableList: FsListDraggableListDirective,
  ) {}

  public get elRef(): ElementRef {
    return this._el;
  }

  public ngOnInit(): void {
    if (this._reorderController.moveDropCallback) {
      this._listenDragEvents();
    }
    this._draggableList.addDraggableDirective(this);
  }

  public ngOnDestroy(): void {
    this._draggableList.removeDraggableDirective(this);
    this._destroy$.next();
    this._destroy$.complete();
  }

  public dragHide(): void {
    this._el.nativeElement.classList.add('drag-hidden');
  }

  private _listenDragEvents() {
    this._draggableList
      .dragStart$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._markReadyToSwapRows();
      });

    this._draggableList
      .dragEnd$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._unmarkRows();
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
