import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  IterableDiffer,
  IterableDiffers,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Column, ReorderPosition, ReorderStrategy, Selection } from '../../models';
import { FsRowComponent } from './row';
import { Draggable } from './draggable';

@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements OnInit, DoCheck, OnDestroy {
  @Input() rows;
  @Input() columns: Column[] = [];
  @Input() hasFooter = false;
  @Input() rowActionsRaw: any[] = [];
  @Input() rowEvents = {};
  @Input() rowClass;
  @Input() reorderEnabled: boolean;
  @Input() reorderPosition: ReorderPosition;
  @Input() reorderStrategy: ReorderStrategy;
  @Input() selection: Selection;
  @Input() restoreMode = false;
  @Input() rowRemoved: EventEmitter<any>;

  @Output() reorderChanged = new EventEmitter<boolean>();

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;
  @ContentChild(FsRowComponent, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  public draggable;
  public dragStartFn = this.dragStart.bind(this);

  private _rowsDiffer: IterableDiffer<any[]>;

  private _destroy$ = new Subject();

  constructor(
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    private differs: IterableDiffers,
    private zone: NgZone,
  ) {
    this._rowsDiffer = differs.find([]).create(null);
  }

  public ngOnInit() {
    this._initDraggableElement();
  }

  public ngDoCheck() {
    if (this._rowsDiffer.diff(this.rows)) {

      if (this.draggable) {
        this.draggable.rows = this.rows;
      }

      this.cdRef.markForCheck();
    }
  }

  public ngOnDestroy() {
    if (this.draggable) {
      this.draggable.destroy();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  public dragStart(event, elemRef: FsRowComponent) {
    if (this.reorderEnabled) {
      event.preventDefault();
      event.stopPropagation();
      this.draggable.dragStart({ event: event, target: elemRef.el && elemRef.el.nativeElement});
    }

    return true;
  }

  private _initDraggableElement() {
    this.draggable = new Draggable(this.el, this.cdRef, this.zone, this.rows);

    // In case when drag always enabled we should fire dragStart/dragEnd events for every drag/drop
    if (this.reorderStrategy === ReorderStrategy.Always) {
      this.draggable.dragStart$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.reorderChanged.next(true);
        });


      this.draggable.dragEnd$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.reorderChanged.next(false);
        });
    }
  }
}
