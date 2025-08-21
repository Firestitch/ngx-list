import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { KitchenSinkComponent } from '../kitchensink/kitchensink.component';
import { GroupsComponent } from '../groups/groups.component';
import { RemoveSimpleComponent } from '../remove/simple/simple.component';
import { RemoveConfirmComponent } from '../remove/confirm/confirm.component';
import { FiltersComponent } from '../filters/filters.component';
import { RestoreComponent } from '../restore/restore.component';
import { SortableComponent } from '../sortable/sortable.component';
import { ToggleReorderComponent } from '../reorder/toggle/toggle.component';
import { ManualReorderComponent } from '../reorder/manual/manual.component';
import { SelectionComponent } from '../selection/selection.component';
import { SelectionReorderComponent } from '../selection-reorder/selection-reorder.component';
import { LoadMoreComponent } from '../load-more/load-more.component';
import { NoResultsComponent } from '../no-results/no-results.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
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
        RemoveSimpleComponent,
        RemoveConfirmComponent,
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
