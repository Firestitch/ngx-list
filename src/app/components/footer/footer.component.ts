import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Column } from '../../models/column.model';
import { SelectionController } from '../../classes/selection-controller';
import { Row } from '../../models/row';

@Component({
  selector: '[fs-list-footer]',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterComponent {

  @Input() hasRowActions: boolean;
  @Input() columns: Column[] = [];
  @Input() selection: SelectionController;
  @Input() rows: Row[];

  constructor() {}
}
