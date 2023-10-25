import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { ReorderPosition, ReorderStrategy } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import { Column } from '../../models/column.model';

@Component({
  selector: '[fs-list-footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFooterComponent {

  @Input() public hasRowActions: boolean;
  @Input() public columns: Column[] = [];
  @Input() public selection: SelectionController;
  @Input() public activeFiltersCount: number;
  @Input() public reorderEnabled: boolean;
  @Input() public reorderPosition: ReorderPosition | null;
  @Input() public reorderStrategy: ReorderStrategy | null;
}
