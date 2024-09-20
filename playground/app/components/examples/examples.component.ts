import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../environments/environment';


@Component({
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ExamplesComponent {
  public config = environment;
}
