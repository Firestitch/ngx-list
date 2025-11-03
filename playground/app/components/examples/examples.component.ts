import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsExampleModule } from '@firestitch/example';

import { environment } from '../../../environments/environment';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { FiltersComponent } from '../filters/filters.component';
import { GroupsComponent } from '../groups/groups.component';
import { KitchenSinkComponent } from '../kitchensink/kitchensink.component';
import { LoadMoreComponent } from '../load-more/load-more.component';
import { NoResultsComponent } from '../no-results/no-results.component';
import { ManualReorderComponent } from '../reorder/manual/manual.component';
import { ToggleReorderComponent } from '../reorder/toggle/toggle.component';
import { RestoreComponent } from '../restore/restore.component';
import { SelectionReorderComponent } from '../selection-reorder/selection-reorder.component';
import { SelectionComponent } from '../selection/selection.component';
import { SortableComponent } from '../sortable/sortable.component';
import { StyleComponent } from '../style/style.component';


@Component({
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsExampleModule,
    KitchenSinkComponent,
    GroupsComponent,
    FiltersComponent,
    RestoreComponent,
    SortableComponent,
    ToggleReorderComponent,
    ManualReorderComponent,
    SelectionComponent,
    SelectionReorderComponent,
    LoadMoreComponent,
    NoResultsComponent,
    EmptyStateComponent,
    StyleComponent,
  ],
})
export class ExamplesComponent {
  public config = environment;
}
