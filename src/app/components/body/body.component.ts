import {
  Component,
  Input,
  ViewChild,
  OnInit,
  DoCheck,
  IterableDiffer,
  ContentChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewContainerRef,
  IterableDiffers,
  ElementRef,
  NgZone,
  TemplateRef,
  EventEmitter,
} from '@angular/core';

import { Column, Selection } from '../../models';
import { FsRowComponent } from './row';
import { Draggable } from './draggable';

@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements OnInit, DoCheck {
  @Input() rows;
  @Input() columns: Column[] = [];
  @Input() hasFooter = false;
  @Input() rowActionsRaw: any[] = [];
  @Input() rowEvents = {};
  @Input() rowClass;
  @Input() reorder = false;
  @Input() selection: Selection;
  @Input() restoreMode = false;
  @Input() rowRemoved: EventEmitter<any>;

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;
  @ContentChild(FsRowComponent, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  public draggable;
  public dragStartFn = this.dragStart.bind(this);

  private _rowsDiffer: IterableDiffer<any[]>;

  constructor(
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    private differs: IterableDiffers,
    private zone: NgZone,
  ) {
    this._rowsDiffer = differs.find([]).create(null);
    this.draggable = new Draggable(this.el, this.cdRef, this.zone, this.rows);
  }

  public ngOnInit() {
  }

  public ngDoCheck() {
    if (this._rowsDiffer.diff(this.rows)) {

      this.draggable.rows = this.rows;

      this.cdRef.markForCheck();
    }
  }

  public dragStart(event, elemRef: FsRowComponent) {
    if (this.reorder) {
      event.preventDefault();
      event.stopPropagation();
      this.draggable.dragStart({ event: event, target: elemRef.el && elemRef.el.nativeElement});
    }

    return true;
  }
}
