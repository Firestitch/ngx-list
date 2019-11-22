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

import { Column } from '../../models/column.model';
import { ReorderPosition, ReorderStrategy } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import { Row } from '../../models/row.model';

import { FsRowComponent } from './row/row.component';
import { Draggable } from './draggable';


@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements OnInit, DoCheck, OnDestroy {
  @Input() rows: Row[];
  @Input() columns: Column[] = [];
  @Input() hasFooter = false;
  @Input() rowActionsRaw: any[] = [];
  @Input() groupActionsRaw: any[] = [];
  @Input() rowEvents = {};
  @Input() rowClass;
  @Input() reorderEnabled: boolean;
  @Input() hasRowActions = false;
  @Input() reorderPosition: ReorderPosition;
  @Input() reorderStrategy: ReorderStrategy;
  @Input() selection: SelectionController;
  @Input() restoreMode = false;
  @Input() rowRemoved: EventEmitter<any>;

  @Output() reorderChanged = new EventEmitter<boolean>();
  @Output() dragStarted = new EventEmitter();
  @Output() dragEnded = new EventEmitter();

  @ViewChild('rowsContainer', { read: ViewContainerRef, static: true }) rowsContainer;
  @ContentChild(FsRowComponent, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<any>;

  public draggable;

  private _rowsDiffer: IterableDiffer<any>;

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

  public startDrag = (event, elemRef: FsRowComponent) => {
    if (this.reorderEnabled) {
      event.preventDefault();
      event.stopPropagation();
      this.draggable.dragStart({ event: event, target: elemRef.el && elemRef.el.nativeElement});
    }

    return true;
  }

  // /**
  //  * Track By for improve change detection
  //  * @param index
  //  * @param item
  //  */
  // public trackByFn(index, item) {
  //   // TODO improve with track by id
  //   return index;
  // }

  private _initDraggableElement() {
    this.draggable = new Draggable(this.el, this.cdRef, this.zone, this.rows);


    this.draggable.dragStart$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.zone.run(() => {
          // In case when drag always enabled we should fire dragStart/dragEnd events for every drag/drop
          if (this.reorderStrategy === ReorderStrategy.Always) {
            this.reorderChanged.next(true);
          }

          this.dragStarted.emit();
        });
      });


    this.draggable.dragEnd$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.zone.run(() => {
          // In case when drag always enabled we should fire dragStart/dragEnd events for every drag/drop
          if (this.reorderStrategy === ReorderStrategy.Always) {
            this.reorderChanged.next(false);
          }

          this.dragEnded.emit();
        });
      });
  }
}
