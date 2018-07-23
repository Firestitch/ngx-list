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
  TemplateRef
} from '@angular/core';
import { Column } from '../../models';
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
  @Input() restoreMode = false;

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;
  @ContentChild(FsRowComponent, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  public draggable;

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
      this.draggable.dragStart({ event: event, target: elemRef.el && elemRef.el.nativeElement});
    }
  }
}
