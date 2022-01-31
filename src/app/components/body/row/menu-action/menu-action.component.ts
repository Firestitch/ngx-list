import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';


@Component({
  selector: 'fs-list-row-menu-action',
  templateUrl: './menu-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowMenuActionComponent {

  @Input()
  public icon: string;

  @Input()
  public label: string;

  @Input()
  public file: boolean;

  @Input()
  public fileMultiple: boolean;

  @Output()
  public fileSelect = new EventEmitter();

  @Output()
  public fileError = new EventEmitter();

}
