import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { RowAction } from '../../../../models/row-action.model';


@Component({
  selector: 'fs-list-row-inline-action',
  templateUrl: './inline-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowInlineActionComponent implements OnChanges {

  @Input()
  public action: RowAction;

  @Output()
  public clicked = new EventEmitter();

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {
    //this._cdRef.detach();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._cdRef.detectChanges();
  }

  public actionClick(event) {
    this.clicked.emit(event);
  }
}
